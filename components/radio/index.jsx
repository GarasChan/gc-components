import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import _Util from '../_util/Util';

/**
 * 复选框
 */
const Radio = (props) => {
    const { prefix = 'gc', defaultChecked, disabled, checked: propsChecked, name } = props;
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
        const { disabled, onChange, children, defaultChecked, prefix, ...returnProps } = props;
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
        <label className={classNames(`${prefix}-radio`, { checked })} disabled={disabled}>
            <span className={`${prefix}-radio-icon`}>
                <input type='radio' checked={checked} disabled={disabled} name={name} onChange={handleChange} />
                <span className={`${prefix}-radio-inner`}></span>
            </span>
            { renderRadio() }
        </label>
    )
}

const RadioGroup1 = (props, ref) => {
    const { prefix = 'gc', className, options, defaultValue, value, children, name } = props;
    if (options !== undefined && !_Util.isArray(options)) {
        console.error('The param "options" expect "array", but not.');
        return null;
    }

    // const radioGroupRef = useRef(null);
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
                        prefix={prefix}
                        ref={null}
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
        <div className={classNames(`${prefix}-radio-group`, {[className]: className})}>
            {renderChildren()}
        </div>
    )
}

export const RadioGroup = forwardRef(RadioGroup1);

export default Radio;