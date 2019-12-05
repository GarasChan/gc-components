import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import classNames from 'classnames';
import _Util from '../_util/Util';

/**
 * 复选框
 */
const Checkbox = (props, ref) => {
    const { prefix = 'gc', defaultChecked, disabled, checked: propsChecked } = props;
    const [ checked, setChecked ] = useState('defaultChecked' in props ? !!defaultChecked : !!propsChecked);

    const checkboxRef = React.createRef(null);

    useImperativeHandle(ref, () => {
        return { 
            ...props,
            checked 
        }
    })

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
        onChange && onChange(e.target.checked);
    }

    return (
        <label className={classNames(`${prefix}-checkbox`, { checked })} disabled={disabled}>
            <span className={`${prefix}-checkbox-icon`}>
                <input type='checkbox' ref={checkboxRef} checked={checked} disabled={disabled} onChange={handleChange} />
                <span className={`${prefix}-checkbox-inner`}></span>
            </span>
            { renderCheckbox() }
        </label>
    )
}

export default forwardRef(Checkbox);