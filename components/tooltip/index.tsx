import React from 'react';
import { default as RcTooltip } from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/es/Tooltip';

export { TooltipProps };

const Tooltip = (props: TooltipProps): React.ReactElement => {
    const { prefixCls = 'gc-tooltip', placement = 'top', ...restProps } = props;

    return <RcTooltip prefixCls={prefixCls} placement={placement} {...restProps} />;
};

export default Tooltip;
