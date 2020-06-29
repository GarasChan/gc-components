import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { isArray, isObject } from 'lodash-es';
import Checkbox, { ReturnValue } from './Checkbox';

type Value = NonNullable<ReturnValue['value']>;

export type CheckboxGroupObjOption = {
    /** 关键字 */
    value: string;
    /** 显示信息 */
    label?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否选中 */
    checked?: boolean;
};

export type CheckboxGroupOption = CheckboxGroupObjOption | Value;

export interface CheckboxGroupProps {
    prefixCls?: string;
    className?: string;
    /** option参数 */
    options: CheckboxGroupOption[];
    /** 选中值 */
    checkedValues: Value[];
    /** 是否禁用 */
    disabled?: boolean;
    onChange: (checkedValues: Value[]) => void;
    /** 用于分组的关键字 */
    name?: string;
}

export function CheckboxGroup(props: CheckboxGroupProps): React.ReactNode {
    const { prefixCls = 'gc-checkbox', className = '', options, disabled, checkedValues = [], onChange } = props;

    const [selectedValues, setSelectedValues] = useState(checkedValues || []);

    useEffect(() => {
        if (checkedValues.length !== selectedValues.length) {
            setSelectedValues(checkedValues);
        }
    }, [checkedValues, selectedValues.length]);

    const getOptions = (): CheckboxGroupObjOption[] => {
        return options.map((option: CheckboxGroupOption) => {
            if (isObject(option)) {
                option = option as CheckboxGroupObjOption;
                option.disabled = 'disabled' in option ? !!option.disabled : !!disabled;
                option.checked = selectedValues.includes(option.value);
                return option;
            } else {
                option = option as string;
                return {
                    label: option,
                    value: option,
                    disabled: !!disabled,
                    checked: selectedValues.includes(option),
                };
            }
        });
    };

    const handleChange = (option: ReturnValue): void => {
        const { value } = option;
        if (value === undefined) {
            return;
        }
        const index = selectedValues.indexOf(value);
        const values = [...selectedValues] as CheckboxGroupProps['checkedValues'];
        if (index === -1) {
            values.push(value);
        } else {
            values.splice(index, 1);
        }
        setSelectedValues(values);
        onChange?.(values);
    };

    const renderChildren = (): React.ReactElement[] => {
        return getOptions().map(option => {
            const { label, value, disabled, checked } = option;
            return (
                <Checkbox
                    prefixCls={prefixCls}
                    key={value}
                    checked={!!checked}
                    disabled={!!disabled}
                    value={value}
                    onChange={handleChange}
                >
                    {label}
                </Checkbox>
            );
        });
    };

    if (!isArray(options)) {
        console.error('The param "options" expect "array", but not.');
        return null;
    }

    return <div className={classNames(`${prefixCls}-group`, className)}>{renderChildren()}</div>;
}

export default CheckboxGroup;
