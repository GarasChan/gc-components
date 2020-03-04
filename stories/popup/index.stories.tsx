import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Popup, Button } from '../../components/index';
import '../../components/popup/style';

storiesOf('Popup', module)
    .addDecorator(withKnobs)
    .add(
        'Simple',
        () => {
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
            const actionOptions = {
                hover: 'hover',
                click: 'click',
                focus: 'focus',
                contextMenu: 'contextMenu'
            };
            const action = select('action', actionOptions, 'click');
            return (
                <div className='demo center' style={{ marginTop: '150px' }}>
                    <Popup
                        trigger={action}
                        withArrow={true}
                        placement={select('placement', placementOptions, 'top')}
                        overlay={
                            <img style={{ width: '100px', height: '100px' }} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
                        }
                    >
                        <Button type='primary'>{action}</Button>
                    </Popup>
                </div>
            )
        }
    )