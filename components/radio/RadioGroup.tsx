import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import Radio, { RadioProps, ReturnValue } from './Radio';
import { isObject, isArray } from 'lodash-es';

type Value = NonNullable<ReturnValue['value']>;

export interface RadioGroupReturnValue {
    value: ReturnValue['value'];
}

export interface RadioGroupProps {
    prefixCls?: string;
    type?: RadioProps['htmlType'];
    className?: string;
    options?: RadioGroupOption[];
    defaultValue?: Value;
    value?: Value;
    children?: React.ReactNode;
    disabled?: boolean;
    /** 用于分组的关键字 */
    name?: string;
    onChange?: (option: RadioGroupReturnValue) => void;
}

export type RadioGroupObjOption = {
    label?: string;
    value: string;
    disabled?: boolean;
};

export type RadioGroupOption = RadioGroupObjOption | string;

const RadioGroup = (props: RadioGroupProps, ref: React.Ref<RadioGroupReturnValue>): React.ReactElement | null => {
    const {
        prefixCls = 'gc-radio',
        type,
        className = '',
        options,
        defaultValue,
        value,
        children,
        onChange,
        name
    } = props;

    const [checkedValue, setCheckedValue] = useState('defaultValue' in props ? defaultValue : value);

    useImperativeHandle(
        ref,
        (): RadioGroupReturnValue => {
            return {
                value: checkedValue
            };
        }
    );

    useEffect(() => {
        if (value !== undefined && value !== checkedValue) {
            setCheckedValue(value);
        }
    }, [value, checkedValue]);

    const getOptions = (): RadioGroupObjOption[] => {
        if (!options) {
            return [];
        }
        return options.map((option: RadioGroupOption) => {
            if (isObject(option)) {
                option = option as RadioGroupObjOption;
                option.disabled = 'disabled' in option ? !!option.disabled : !!props.disabled;
                return option;
            } else {
                option = option as string;
                return {
                    label: option,
                    value: option,
                    disabled: !!props.disabled
                };
            }
        });
    };

    const handleChange = (option: ReturnValue): void => {
        const { value } = option;
        if (value === undefined) {
            return;
        }
        if (!('value' in props)) {
            setCheckedValue(value);
        }
        onChange?.({ value });
    };

    const renderChildren = (): any => {
        if (children !== undefined) {
            return React.Children.map(children, (child: any) => {
                const { value } = child.props;
                return React.cloneElement(child, {
                    type,
                    checked: value === checkedValue,
                    onChange: handleChange,
                    name
                });
            });
        } else {
            return getOptions().map(option => {
                const { label, value, disabled } = option;
                return (
                    <Radio
                        prefixCls={prefixCls}
                        htmlType={type}
                        key={value.toString()}
                        checked={checkedValue === value}
                        disabled={disabled}
                        value={value}
                        onChange={handleChange}
                        name={name}
                    >
                        {label}
                    </Radio>
                );
            });
        }
    };

    if (options !== undefined && !isArray(options)) {
        console.error('The param "options" expect "array", but not.');
        return null;
    }

    return (
        <div
            className={classNames(`${prefixCls}-group`, {
                [`${prefixCls}-group-button`]: type === 'button',
                [className]: className
            })}
        >
            {renderChildren()}
        </div>
    );
};

export default forwardRef(RadioGroup);
