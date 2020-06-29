import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export interface ReturnValue {
    checked: boolean;
    value: CheckboxProps['value'];
}

export interface CheckboxProps {
    prefixCls?: string;
    className?: string;
    /** 默认是否选中 仅执行一次 */
    defaultChecked?: boolean;
    /** 是否选中 */
    checked?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    children?: React.ReactNode;
    /** 关键字 */
    value?: string;
    /** 用于分组的关键字 */
    name?: string;
    onChange?: (options: ReturnValue) => void;
}

/**
 * 复选框
 */
const Checkbox = (props: CheckboxProps): React.ReactElement => {
    const {
        prefixCls = 'gc-checkbox',
        className,
        defaultChecked,
        disabled,
        checked: propsChecked,
        children,
        onChange,
        value,
        name,
    } = props;
    const [checked, setChecked] = useState('defaultChecked' in props ? !!defaultChecked : !!propsChecked);

    useEffect(() => {
        if (propsChecked !== undefined && propsChecked !== checked) {
            setChecked(!!propsChecked);
        }
    }, [propsChecked, checked]);

    const renderCheckbox = (): any => {
        return React.Children.map(children, child => {
            return React.isValidElement(child) ? child : <span>{child}</span>;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (disabled) {
            return;
        }
        if (!('checked' in props)) {
            setChecked(e.target.checked);
        }
        onChange?.({ checked: e.target.checked, value });
    };

    return (
        <label className={classNames(prefixCls, className, { checked, disabled })}>
            <span className={`${prefixCls}-icon`}>
                <input type="checkbox" checked={checked} name={name} disabled={disabled} onChange={handleChange} />
                <span className={`${prefixCls}-inner`}></span>
            </span>
            {renderCheckbox()}
        </label>
    );
};

export default Checkbox;
