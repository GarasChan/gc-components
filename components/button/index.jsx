import React, { forwardRef } from 'react';

import classNames from 'classnames';
import Icon from '../icon';
import _Util from '../_util/Util';
import { useImperativeHandle } from 'react';
import { useRef } from 'react';

// type => class
const themeCls = {
    primary: 'primary',
    danger: 'danger'
}

/**
 * 按钮
 */
function Button(props, ref) {
    const { children, type, className, disabled, icon, prefixCls = 'gc-button', loading, ...restProps } = props;
    const theme = themeCls[type];
    const isLoading = 'loading' in props && loading !== false;
    const validProps = {
        className: classNames(
            prefixCls,
            {
                [className]: className,
                [theme]: theme,
                'icon-only': children === undefined && (isLoading || icon !== undefined),
                loading: isLoading
            }
        ),
        disabled
    }

    const buttonRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            current: buttonRef.current
        }
    })

    /**
     * 给string加上span
     * @param {*} children 
     */
    const renderChildren = () => {
        return React.Children.map(props.children, (child) => {
            return _Util.isString(child) ? <span>{child}</span> : child
        })
    }

    /**
     * 渲染按钮孩子
     */
    const renderButton = () => {
        let { icon, loading } = props;
        if (loading) {
            icon = 'reload';
        }
        if (icon !== undefined) {
            return (
                <>
                    <Icon className={`${prefixCls}-icon`} type={icon} />
                    {renderChildren()}
                </>
            )
        } else {
            return renderChildren()
        }
    }

    return (
        <button ref={buttonRef} {...validProps} {...restProps}>
            {renderButton()}
        </button>
    )
}

export function ButtonGroup(props) {
    const { prefixCls = 'gc-button', children } = props;
    return (
        <div className={`${prefixCls}-group`}>
            {
                React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        className: prefixCls
                    })
                })
            }
        </div>
    )
}

export default forwardRef(Button);