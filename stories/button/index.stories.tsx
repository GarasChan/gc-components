import React, { useState, useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, ButtonGroup, Icon } from '../../components';
import '../../components/button/style';
import '../../components/icon/style';
import '../../components/assets/font/iconfont';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
    .add('Theme', () => {
        const props = {
            tag: select('tag', { button: 'button', link: 'link' }, 'button'),
            type: select('type', { empty: 'empty', fill: 'fill', stroke: 'stroke' }, 'fill'),
            theme: select('theme', { default: 'default', primary: 'primary', danger: 'danger' }, 'primary'),
            size: select('size', { tiny: 'tiny', small: 'small', normal: 'normal', large: 'large' }, 'normal'),
            block: boolean('block', false),
            disabled: boolean('disabled', false),
            onClick: action('clicked'),
        };

        return (
            <div className="demo center">
                <Button {...props}>测试按钮</Button>
            </div>
        );
    })
    .add('With icon', () => {
        return (
            <div className="demo center">
                <Button icon="gc-icons-search" type="empty"></Button>
                <Button theme="primary" icon="gc-icons-refresh"></Button>
            </div>
        );
    })
    .add('With icon and text', () => {
        return (
            <div className="demo center">
                <Button icon="gc-icons-search">搜索</Button>
                <Button theme="primary" icon="gc-icons-share">
                    分享
                </Button>
            </div>
        );
    })
    .add('With Icon component', () => {
        return (
            <div className="demo center">
                <Button>
                    <Icon type="gc-icons-search" />
                </Button>
                <Button theme="primary">
                    <Icon type="gc-icons-refresh" />
                    <span>刷新</span>
                </Button>
            </div>
        );
    })
    .add('Loading', () => {
        type timerType = any;
        const [loading, setLoading] = useState(false);
        const [loading1, setLoading1] = useState(false);
        const timer = useRef<timerType>();

        useEffect(() => {
            timer.current = setTimeout(() => {
                setLoading(false);
            }, 2000);
            return (): void => {
                clearTimeout(timer.current);
            };
        }, [loading]);

        return (
            <div className="demo center">
                <Button
                    icon="gc-icons-uploading"
                    loading={loading}
                    onClick={(): void => {
                        setLoading(true);
                    }}
                ></Button>
                <Button theme="primary" loading></Button>
                <Button icon="gc-icons-reload" loading={true}>
                    刷新
                </Button>
                <Button
                    theme="primary"
                    loading={loading1}
                    onClick={(): void => {
                        setLoading1(loading => !loading);
                    }}
                >
                    {loading1 ? '再点我' : '点我'}
                </Button>
            </div>
        );
    })
    .add('ButtonGroup', () => {
        return (
            <div className="demo center">
                <div>
                    <ButtonGroup>
                        <Button theme="danger" type="stroke" icon="gc-icons-top-page" />
                        <Button theme="danger" type="stroke" icon="gc-icons-play" />
                        <Button theme="danger" type="stroke" icon="gc-icons-end-page" />
                    </ButtonGroup>
                </div>
                <div>
                    <ButtonGroup>
                        <Button theme="primary" icon="gc-icons-arrow-left">
                            上一页
                        </Button>
                        <Button theme="primary" icon="gc-icons-arrow-right">
                            下一页
                        </Button>
                    </ButtonGroup>
                </div>
                <div>
                    <ButtonGroup>
                        <Button icon="gc-icons-point-layer"></Button>
                        <Button icon="gc-icons-line-layer"></Button>
                        <Button icon="gc-icons-polygon-layer"></Button>
                        <Button icon="gc-icons-text-layer"></Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    });
