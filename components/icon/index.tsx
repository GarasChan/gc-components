import React from 'react';
import classNames from 'classnames';
// import '../assets/font/iconfont';

export interface IconProps {
    type: string;
    className?: string;
    prefixCls?: string;
    [optional: string]: any;
}

const Icon = (props: IconProps) => {
    const { type, className = '', prefixCls = 'gc-icon', ...restProps } = props;
    const cls = classNames(
        prefixCls, 
        { 
            [className]: className
        }
    )

    return (
        <i className={cls} {...restProps}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={`#gc-icons-${type}`}></use>
            </svg>
        </i>
    )
}

export default Icon;