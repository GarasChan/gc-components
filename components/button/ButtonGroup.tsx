import React from 'react';
import classNames from 'classnames';

export interface ButtonGroupProps {
    prefixCls?: string;
    className?: string;
    children: React.ReactNode;
}
const ButtonGroup = (props: ButtonGroupProps): React.ReactElement => {
    const { prefixCls = 'gc-button', className, children } = props;
    return (
        <div className={classNames(`${prefixCls}-group`, className)}>
            {React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    prefixCls,
                });
            })}
        </div>
    );
};

export default ButtonGroup;
