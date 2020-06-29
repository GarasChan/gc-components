import React, { useState, useEffect } from 'react';
import Tooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/es/Tooltip';

export interface PopupProps extends TooltipProps {
    defaultVisible?: boolean;
    visible?: boolean;
}

const Popup = (props: PopupProps): React.ReactElement => {
    const {
        prefixCls = 'gc-popup',
        trigger = 'click',
        transitionName = 'gc-zoom',
        placement = 'top',
        defaultVisible,
        visible: overlayVisible,
        overlay,
        children,
        onVisibleChange,
        ...restProps
    } = props;

    const [visible, setVisible] = useState('visible' in props ? !!overlayVisible : !!defaultVisible);

    useEffect(() => {
        if (overlayVisible !== undefined && visible !== overlayVisible) {
            setVisible(!!overlayVisible);
        }
    }, [overlayVisible, visible]);

    const handleVisibleChange = (visible: boolean): void => {
        if (!('visible' in props)) {
            setVisible(visible);
        }
        onVisibleChange?.(visible);
    };

    return (
        <Tooltip
            {...restProps}
            prefixCls={prefixCls}
            trigger={trigger}
            placement={placement}
            transitionName={transitionName}
            onVisibleChange={handleVisibleChange}
            visible={visible}
            overlay={overlay}
        >
            {children}
        </Tooltip>
    );
};

export default Popup;
