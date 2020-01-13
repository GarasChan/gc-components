import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import Tooltip from "rc-tooltip";

function Popup(props) {
    const { 
        prefixCls = 'gc-popup', 
        trigger = ['click'],
        defaultVisible, 
        visible: overlayVisible, 
        placement = 'top', 
        withArrow = false,
        overlay, 
        children, 
        align= {},
        ...tooltipProps
    } = props;

    const [visible, setVisible] = useState('visible' in props ? !!overlayVisible : !!defaultVisible);

    useEffect(() => {
        if ('visible' in props && visible !== overlayVisible) {
            setVisible(overlayVisible);
        }
    }, [overlayVisible])

    const handleVisibleChange = (visible) => {
        const { onVisibleChange } = props;
        if (!('visible' in props)) {
            setVisible(visible);
        }
        onVisibleChange && onVisibleChange(visible, e);
    };

    return (
        <Tooltip
            {...tooltipProps}
            prefixCls={prefixCls}
            trigger={trigger}
            overlay={overlay}
            overlayClassName={classNames({ [`${prefixCls}-with-arrow`]: withArrow })}
            placement={placement}
            transitionName='gc-zoom'
            onVisibleChange={handleVisibleChange}
            visible={visible} 
            align={align}
        >
            {children}
        </Tooltip>
    )
}

export default Popup;