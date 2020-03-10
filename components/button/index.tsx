import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import _Util from '../_util/Util';

export interface ButtonProps {
    children?: React.ReactNode;
    type?: 'primary' | 'danger' | undefined;
    className?: string;
    disabled?: boolean;
    icon?: string;
    prefixCls?: string;
    loading?: boolean;
    [optional: string]: any;
}

export interface ButtonGroupProps {
    prefixCls?: string;
    children: React.ReactNode;
}

// type => class
const themeCls = {
    primary: 'primary',
    danger: 'danger',
};

/**
 * 按钮
 */
const Button = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const {
        children,
        type = '',
        className = '',
        disabled,
        icon,
        prefixCls = 'gc-button',
        loading,
        ...restProps
    } = props;
    const theme = type && themeCls[type];
    const isLoading = 'loading' in props && loading !== false;
    const validProps = {
        className: classNames(prefixCls, {
            [className]: className,
            [theme]: theme,
            'icon-only': children === undefined && (isLoading || icon !== undefined),
            loading: isLoading,
        }),
        disabled,
    };

    /**
     * 给string加上span
     * @param {*} children
     */
    const renderChildren = () => {
        return React.Children.map(props.children, child => {
            return _Util.isString(child) ? <span>{child}</span> : child;
        });
    };

    /**
     * 渲染按钮孩子
     */
    const renderButton = () => {
        const { loading } = props;
        let { icon } = props;
        if (loading) {
            icon = 'reload';
        }
        if (icon !== undefined) {
            return (
                <>
                    <Icon className={`${prefixCls}-icon`} type={icon} />
                    {renderChildren()}
                </>
            );
        } else {
            return renderChildren();
        }
    };

    return (
        <button ref={ref} {...validProps} {...restProps}>
            {renderButton()}
        </button>
    );
};

export function ButtonGroup(props: ButtonGroupProps) {
    const { prefixCls = 'gc-button', children } = props;
    return (
        <div className={`${prefixCls}-group`}>
            {React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    className: prefixCls,
                });
            })}
        </div>
    );
}

export default forwardRef(Button);
