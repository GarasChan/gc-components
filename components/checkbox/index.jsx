import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import _Util from '../_util/Util';

/**
 * 复选框
 */
const Checkbox = (props) => {
    const { prefix = 'gc', defaultChecked, disabled, checked: propsChecked } = props;
    const [ checked, setChecked ] = useState('defaultChecked' in props ? !!defaultChecked : !!propsChecked);

    useEffect(() => {
        if ('checked' in props && props.checked !== checked) {
            setChecked(props.checked);
        }
    }, [props.checked, checked])

    const renderCheckbox = () => {
        return React.Children.map(props.children, (child) => {
            return _Util.isString(child) ? <span>{child}</span> : child
        })
    }

    const handleChange = (e) => {
        const { disabled, onChange } = props;
        if (disabled) {
            return;
        }
        if (!('checked' in props)) {
            setChecked(e.target.checked)
        }
        onChange && onChange({
            ...props,
            checked: e.target.checked
        });
    }

    return (
        <label className={classNames(`${prefix}-checkbox`, { checked })} disabled={disabled}>
            <span className={`${prefix}-checkbox-icon`}>
                <input type='checkbox' checked={checked} disabled={disabled} onChange={handleChange} />
                <span className={`${prefix}-checkbox-inner`}></span>
            </span>
            { renderCheckbox() }
        </label>
    )
}

export function CheckboxGroup(props) {
    const { prefix = 'gc', className, options, checkedValues = [] } = props;
    if (!_Util.isArray(options)) {
        console.error('The param "options" expect "array", but not.');
        return null;
    }

    const [selectedValues, setSelectedValues] = useState(checkedValues || []);

    useEffect(() => {
        if (checkedValues.length !== selectedValues.length) {
            setSelectedValues(checkedValues);
        }
    }, [checkedValues])

    const getOptions = () => {
        return options.map(option => {
            if (_Util.isObject(option)) {
                option.disabled = 'disabled' in option ? !!option.disabled : !!props.disabled;
                option.checked = selectedValues.includes(option.value);
                return option;
            } else {
                return {
                    label: option,
                    value: option,
                    disabled: !!props.disabled,
                    checked: selectedValues.includes(option)
                }
            }
        })
    }

    const renderChildren = () => {
        return getOptions().map(option => {
            const { label, value, disabled, checked } = option;
            return (
                <Checkbox 
                    prefix={prefix}
                    ref={null}
                    key={value.toString()} 
                    checked={checked} 
                    disabled={disabled}
                    value={value} 
                    onChange={handleChange}
                >
                    {label}
                </Checkbox>
            )
        })
    }

    const handleChange = (option) => {
        const { value } = option;
        const index = selectedValues.indexOf(value);
        const values = [...selectedValues];
        if (index === -1) {
            values.push(value);
        } else {
            values.splice(index, 1);
        }
        setSelectedValues(values);
        props.onChange && props.onChange(values);
    }
    
    return (
        <div className={classNames(`${prefix}-checkbox-group`, {[className]: className})}>
            {renderChildren()}
        </div>
    )
}

export default Checkbox;