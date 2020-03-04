import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select, Option } from '../../components/index';
import '../../components/select/style';

storiesOf('Select', module)
    // .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
    .add(
        'Simple',
        () => {
            const options = ['Apple', 'Pear', 'Orange', 'Banana', 'Apple_1', 'Pear_1', 'Orange_1', 'Banana_1'];

            return (
                <div className='demo center'>
                    <Select defaultValue='Orange' dropdownStyle={{height: 100}}>
                        {
                            options.map(option => {
                                return <Option key={option} value={option}>{option}</Option>
                            })
                        }
                    </Select>
                </div>
            )
        }
    )