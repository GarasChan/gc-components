import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Separator, Icon } from '../../components/index';
import '../../components/separator/style';

storiesOf('Separator', module)
    .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
    .add(
        'Separator',
        () => {
            return (
                <>
                    <div>
                        cgl
                        <Separator type='dash'/>
                        love
                        <Separator>Divider line</Separator>
                        zzq
                        <Separator type='dash'>我是分割线</Separator>
                        love
                        <Separator/>
                        cgl
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', height: 500}}>
                        cgl
                        <Separator orientation='vertical' type='dash'/>
                        love
                        <Separator orientation='vertical'>Divider line</Separator>
                        zzq
                        <Separator orientation='vertical' type='dash'>我是分割线</Separator>
                        love
                        <Separator orientation='vertical'/>
                        cgl
                    </div>
                </>
            )
        }
    )
    .add(
        'custom',
        () => {
            return (
                <>
                    <div>
                        <Separator innerStyle={{display: 'flex', alignItems: 'center'}}>
                            <Icon type='layer-info'/>
                            <span style={{marginLeft: 8}}>没有更多啦</span>
                        </Separator>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', height: 500}}>
                        <Separator orientation='vertical' innerStyle={{display: 'flex', alignItems: 'center'}}>
                            <Icon type='layer-info'/>
                            <span style={{marginTop: 8}}>没有更多啦</span>
                        </Separator>
                    </div>
                </>
            )
        }
    )