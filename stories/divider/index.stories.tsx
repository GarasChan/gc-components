import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Divider, Icon } from '../../components';
import '../../components/divider/style';

storiesOf('Divider', module)
    .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
    .add('Divider', () => {
        return (
            <>
                <div>
                    cgl
                    <Divider type="dash" />
                    love
                    <Divider>Divider line</Divider>
                    zzq
                    <Divider type="dash">我是分割线</Divider>
                    love
                    <Divider />
                    cgl
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: 500 }}>
                    cgl
                    <Divider orientation="vertical" type="dash" />
                    love
                    <Divider orientation="vertical">Divider line</Divider>
                    zzq
                    <Divider orientation="vertical" type="dash">
                        我是分割线
                    </Divider>
                    love
                    <Divider orientation="vertical" />
                    cgl
                </div>
            </>
        );
    })
    .add('custom', () => {
        return (
            <>
                <div>
                    <Divider innerStyle={{ display: 'flex', alignItems: 'center' }}>
                        <Icon type="layer-info" />
                        <span style={{ marginLeft: 8 }}>没有更多啦</span>
                    </Divider>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: 500 }}>
                    <Divider orientation="vertical" innerStyle={{ display: 'flex', alignItems: 'center' }}>
                        <Icon type="layer-info" />
                        <span style={{ marginTop: 8 }}>没有更多啦</span>
                    </Divider>
                </div>
            </>
        );
    });
