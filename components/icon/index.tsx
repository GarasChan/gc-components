import React from 'react';
import classNames from 'classnames';

export interface IconProps {
    type: string;
    className?: string;
    prefixCls?: string;
    svgStyle?: React.CSSProperties;
}

const Icon = (props: IconProps): React.ReactElement => {
    const { type, className, prefixCls = 'gc-icon', svgStyle } = props;

    return (
        <i className={classNames(prefixCls, className)}>
            <svg className="icon" aria-hidden="true" style={svgStyle}>
                <use xlinkHref={`#${type}`}></use>
            </svg>
        </i>
    );
};

export default Icon;
