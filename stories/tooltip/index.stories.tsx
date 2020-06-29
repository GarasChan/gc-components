import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Tooltip, Button } from '../../components';
import '../../components/tooltip/style';

storiesOf('Tooltip', module)
    .addDecorator(withKnobs)
    .add('Simple', () => {
        const placementOptions = {
            topLeft: 'topLeft',
            top: 'top',
            topRight: 'topRight',
            bottomLeft: 'bottomLeft',
            bottom: 'bottom',
            bottomRight: 'bottomRight',
            leftTop: 'leftTop',
            left: 'left',
            leftBottom: 'leftBottom',
            rightTop: 'rightTop',
            right: 'right',
            rightBottom: 'rightBottom',
        };
        const triggerOptions = {
            hover: 'hover',
            click: 'click',
            focus: 'focus',
        };
        return (
            <div className="demo center" style={{ marginTop: '150px' }}>
                <Tooltip
                    overlay="我是 Tooltip"
                    trigger={select('trigger', triggerOptions, 'hover')}
                    placement={select('placement', placementOptions, 'top')}
                >
                    <Button theme="primary">测试按钮</Button>
                </Tooltip>
            </div>
        );
    });
