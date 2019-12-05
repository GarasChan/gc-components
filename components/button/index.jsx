import React from 'react';

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
function Button(props) {
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
                    <Icon type={icon} />
                    {renderChildren()}
                </>
            )
        } else {
            return renderChildren()
        }
    }

    return (
        <button {...validProps} {...restProps}>
            {renderButton()}
        </button>
    )
}

export function ButtonGroup(props) {
    const { prefix = 'gc', children } = props;
    return (
        <div className={`${prefix}-button-group`}>
            {children}
        </div>
    )
}

export default Button;