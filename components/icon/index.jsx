import React from 'react';
import classNames from 'classnames';
import '../assets/font/iconfont';

const Icon = (props) => {
    const { type, className, prefixCls = 'gc', ...restProps } = props;
    const cls = classNames(
        `${prefixCls}-icon`, 
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