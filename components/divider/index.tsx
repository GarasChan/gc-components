import React from 'react';
import classNames from 'classnames';

export interface DividerProps {
    children?: React.ReactNode;
    prefixCls?: string;
    type?: 'dash';
    className?: string;
    orientation?: 'vertical';
    innerStyle?: React.CSSProperties;
}

const Divider = (props: DividerProps): React.ReactElement => {
    const { children, prefixCls = 'gc-separator', type, className, orientation, innerStyle = {}, ...restprops } = props;

    const cls = classNames(
        prefixCls,
        {
            [`${prefixCls}-dash`]: type === 'dash',
            [`${prefixCls}-with-inner`]: children !== undefined,
            [`${prefixCls}-vertical`]: orientation === 'vertical'
        },
        className
    );

    return (
        <div className={cls} {...restprops}>
            {children !== undefined && (
                <span className={`${prefixCls}-inner`} style={innerStyle}>
                    {children}
                </span>
            )}
        </div>
    );
};

export default Divider;
