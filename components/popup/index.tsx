import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import Tooltip from "rc-tooltip";
import { TooltipProps } from 'rc-tooltip/es/Tooltip';

export interface PopupProps extends TooltipProps {
    defaultVisible?: boolean, 
    visible?: boolean, 
    withArrow?: boolean, 
}

function Popup(props: PopupProps) {
    const { 
        prefixCls = 'gc-popup', 
        trigger = 'click',
        defaultVisible, 
        visible: overlayVisible, 
        placement = 'top', 
        withArrow = false,
        overlay, 
        children, 
        ...restProps
    } = props;

    const [visible, setVisible] = useState('visible' in props ? !!overlayVisible : !!defaultVisible);

    useEffect(() => {
        if ('visible' in props && visible !== overlayVisible) {
            setVisible(!!overlayVisible);
        }
    }, [overlayVisible])

    const handleVisibleChange = (visible: boolean) => {
        const { onVisibleChange } = props;
        if (!('visible' in props)) {
            setVisible(visible);
        }
        onVisibleChange && onVisibleChange(visible);
    };

    return (
        <Tooltip
            {...restProps}
            prefixCls={prefixCls}
            trigger={trigger}
            overlayClassName={classNames({ [`${prefixCls}-with-arrow`]: withArrow })}
            placement={placement}
            transitionName='gc-zoom'
            onVisibleChange={handleVisibleChange}
            visible={visible} 
            overlay={overlay}
        >
            {children}
        </Tooltip>
    )
}

export default Popup;