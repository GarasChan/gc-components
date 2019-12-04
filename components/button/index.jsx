import React, { useReducer } from 'react';

import classNames from 'classnames';
import Icon from '../icon';
import _Util from '../_util/Util';

// type => class
const themeCls = {
    primary: 'primary',
    danger: 'danger'
}

/**
 * 按钮
 */
const Button = (props) => {
    const { children, type, className, disabled, icon, prefix = 'gc', loading, ...restProps } = props;
    const theme = themeCls[type];
    const isLoading = 'loading' in props && loading !== false;
    const validProps = {
        className: classNames(
            `${prefix}-button`, 
            { 
                [className]: className, 
                [theme]: theme,
                'icon-only': children === undefined && (isLoading || icon !== undefined),
                loading: isLoading
            }
        ), 
        disabled
    }

    /**
     * 给string加上span
     * @param {*} children 
     */
    const renderChildren = children => {
        if (!_Util.isArray(children)) {
            children = [children];
        }
        return children.map((child, idx) => {
            return _Util.isString(child) ? <span key={idx}>{child}</span> : child
        })
    }

    /**
     * 渲染按钮孩子
     */
    const renderButton = () => {
        let { icon, children, loading } = props;
        if (loading) {
            icon = 'reload';
        }
        if (icon !== undefined) {
            if (children !== undefined) {
                return (
                    <>
                        <Icon type={icon} />
                        {renderChildren(children)}
                    </>
                )
            } else {
                return <Icon type={icon} />
            }
        } else if (icon === undefined && children !== undefined) {
            return renderChildren(children)
        }
    }

    return (
        <button {...validProps} {...restProps}>
            { renderButton() }
        </button>
    )
}

export const ButtonGroup = (props) => {
    const { prefix = 'gc', children } = props;
    return (
        <div className={`${prefix}-button-group`}>
            {children}
        </div>
    )
}

export default Button;