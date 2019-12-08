import React, { useState, useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, ButtonGroup } from '../../components/index';
import { Icon } from '../../components/index';
import '../../components/button/style';
import '../../components/icon/style';

storiesOf('Button', module)
    .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
    .add(
        'Theme',
        () => {
            return (
                <div className='demo center'>
                    <Button>测试按钮</Button>
                    <Button type='primary'>测试按钮</Button>
                    <Button type='danger' onClick={action('button-click')}>测试按钮</Button>
                    <Button type='default' disabled onClick={action('button-click')}>测试按钮</Button>
                </div>
            )
        }
    )
    .add(
        'With icon',
        () => {
            return (
                <div className='demo center'>
                    <Button icon='search'></Button>
                    <Button type='primary' icon='refresh'></Button>
                </div>
            )
        }
    )
    .add(
        'With icon and text',
        () => {
            return (
                <div className='demo center'>
                    <Button icon='search'>搜索</Button>
                    <Button type='primary' icon='share'>分享</Button>
                </div>
            )
        }
    )
    .add(
        'With Icon component',
        () => {
            return (
                <div className='demo center'>
                    <Button>
                        <Icon type='search' />
                    </Button>
                    <Button type='primary'>
                        <Icon type='refresh' />
                        <span>刷新</span>
                    </Button>
                </div>
            )
        }
    )
    .add(
        'Loading',
        () => {
            const [loading, setLoading] = useState(false);
            const [loading1, setLoading1] = useState(false);
            const timer = useRef(null);

            useEffect(() => {
                timer.current = setTimeout(() => {
                    setLoading(false);
                }, 2000);
                return () => {
                    clearTimeout(timer.current);
                }
            }, [loading])
            
            return (
                <div className='demo center'>
                    <Button icon='uploading' loading={loading} onClick={() => { setLoading(true) }}></Button>
                    <Button type='primary' loading></Button>
                    <Button icon='path' loading={true}>刷新</Button>
                    <Button 
                        type='primary' 
                        loading={loading1} 
                        onClick={() => { setLoading1(loading => !loading) }}
                    >
                        {loading1 ? '再点我' : '点我'}
                    </Button>
                </div>
            )
        }
    )
    .add(
        'ButtonGroup',
        () => {
            return (
                <div className='demo center'>
                    <div>
                        <ButtonGroup>
                            <Button icon='top-page' />
                            <Button icon='play' />
                            <Button icon='end-page' />
                        </ButtonGroup>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button type='primary' icon='arrow-left'>
                                上一页
                            </Button>
                            <Button type='primary' icon='arrow-right'>
                                下一页
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button type='danger' icon='point-layer'></Button>
                            <Button type='danger' icon='line-layer'></Button>
                            <Button type='danger' icon='polygon-layer'></Button>
                            <Button type='danger' icon='text-layer'></Button>
                        </ButtonGroup>
                    </div>
                </div>
            )
        }
    )