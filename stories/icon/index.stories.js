import React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from '../../components/index';
import '../../components/icon/style';

storiesOf('Icon', module)
    .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
    .add(
        'Icon',
        () => {
            return (
                <div className='demo center'>
                    <Icon type='search' />
                    <Icon type='waring' />
                </div>
            )
        }
    )