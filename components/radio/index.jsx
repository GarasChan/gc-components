import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import _Util from '../_util/Util';

/**
 * 复选框
 */
const Radio = (props) => {
    const { prefixCls = 'gc-radio', className, defaultChecked, disabled, checked: propsChecked, name, type } = props;
    const [ checked, setChecked ] = useState('defaultChecked' in props ? !!defaultChecked : !!propsChecked);

    useEffect(() => {
        if ('checked' in props && props.checked !== checked) {
            setChecked(props.checked);
        }
    }, [props.checked, checked])

    const renderRadio = () => {
        return React.Children.map(props.children, (child) => {
            return _Util.isString(child) ? <span>{child}</span> : child
        })
    }

    const handleChange = (e) => {
        const { disabled, onChange, children, defaultChecked, prefixCls, ...returnProps } = props;
        if (disabled) {
            return;
        }
        if (!('checked' in props)) {
            setChecked(e.target.checked)
        }
        onChange && onChange({
            ...returnProps,
            checked: e.target.checked
        });
    }

    return (
        <label className={classNames(prefixCls, { [className]: className, checked })} disabled={disabled}>
            <span className={type === 'button' ? `${prefixCls}-button` : `${prefixCls}-icon`}>
                <input type='radio' checked={checked} disabled={disabled} name={name} onChange={handleChange} />
                <span className={`${prefixCls}-inner`}></span>
            </span>
            { renderRadio() }
        </label>
    )
}

export const RadioGroup = forwardRef((props, ref) => {
    const { prefixCls = 'gc-radio', type, className, options, defaultValue, value, children, name } = props;
    if (options !== undefined && !_Util.isArray(options)) {
        console.error('The param "options" expect "array", but not.');
        return null;
    }

    const [checkedValue, setCheckedValue] = useState('defaultValue' in props ? defaultValue : value);

    useImperativeHandle(ref, () => {
        return {
            name,
            value: checkedValue
        }
    })

    useEffect(() => {
        if ('value' in props && props.value !== checkedValue) {
            setCheckedValue(props.value);
        }
    }, [props.value, value])

    const getOptions = () => {
        return options.map(option => {
            if (_Util.isObject(option)) {
                option.disabled = 'disabled' in option ? !!option.disabled : !!props.disabled;
                return option;
            } else {
                return {
                    label: option,
                    value: option,
                    disabled: !!props.disabled
                }
            }
        })
    }

    const renderChildren = () => {
        if (children !== undefined) {
            return React.Children.map(children, (child) => {
                const { value } = child.props;
                return React.cloneElement(child, {
                    type,
                    checked: value === checkedValue,
                    onChange: handleChange,
                    name
                })
            });
        } else {
            return getOptions().map(option => {
                const { label, value, disabled } = option;
                return (
                    <Radio 
                        prefixCls={prefixCls}
                        type={type}
                        key={value.toString()} 
                        checked={checkedValue === value} 
                        disabled={disabled}
                        value={value} 
                        name={name}
                        onChange={handleChange}
                    >
                        {label}
                    </Radio>
                )
            })
        }
    }

    const handleChange = (option) => {
        const { value } = option;
        if (!('value' in props)) {
            setCheckedValue(value);
        }
        const { onChange, name } = props;
        onChange && onChange({ name, value });
    }

    return (
        <div className={classNames(`${prefixCls}-group`, {[`${prefixCls}-group-button`]: type === 'button', [className]: className})}>
            {renderChildren()}
        </div>
    )
})

export default Radio;