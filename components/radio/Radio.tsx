import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export interface ReturnValue {
    /** 是否选中 */
    checked: boolean;
    /** 关键字 */
    value: RadioProps['value'];
}

export interface RadioProps {
    prefixCls?: string;
    className?: string;
    /** 默认是否选中 仅执行一次 */
    defaultChecked?: boolean;
    /** 是否选中 */
    checked?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 关键字 */
    value?: string;
    /** 渲染标签类型，仅样式改变 */
    htmlType?: 'button';
    /** 用于分组的关键字 */
    name?: string;
    children?: React.ReactNode;
    onChange?: (option: ReturnValue) => void;
}

/**
 * 复选框
 */
const Radio = (props: RadioProps): React.ReactElement => {
    const {
        prefixCls = 'gc-radio',
        className = '',
        defaultChecked,
        disabled,
        checked: propsChecked,
        value,
        htmlType,
        onChange,
        name,
    } = props;
    const [checked, setChecked] = useState('defaultChecked' in props ? !!defaultChecked : !!propsChecked);

    useEffect(() => {
        if (propsChecked !== undefined && propsChecked !== checked) {
            setChecked(!!propsChecked);
        }
    }, [propsChecked, checked]);

    const renderRadio = (): any => {
        return React.Children.map(props.children, child => {
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
        onChange?.({
            checked: e.target.checked,
            value,
        });
    };

    return (
        <label className={classNames(prefixCls, className, { checked, disabled })}>
            <span className={htmlType === 'button' ? `${prefixCls}-button` : `${prefixCls}-icon`}>
                <input type="radio" checked={checked} disabled={disabled} name={name} onChange={handleChange} />
                <span className={`${prefixCls}-inner`}></span>
            </span>
            {renderRadio()}
        </label>
    );
};

export default Radio;
