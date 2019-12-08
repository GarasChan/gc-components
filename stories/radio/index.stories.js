import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { Radio, RadioGroup, Button } from '../../components/index';
import '../../components/radio/style';

storiesOf('Radio', module)
    .add(
        'Radio',
        () => {
            const [checked, setChecked] = useState(false);
            const [disabled, setDisabled] = useState(false);

            const onChange = (params) => {
                setChecked(params.checked);
            }

            return (
                <div className='demo center'>
                    <Radio checked={checked} onChange={onChange} disabled={disabled}>Controlled</Radio>
                    <Button onClick={() => { setChecked(checked => !checked) }}>{checked ? 'UnCheck' : 'Check'}</Button>
                    <Button onClick={() => { setDisabled(disabled => !disabled) }}>{disabled ? 'Disabled' : 'Enable'}</Button>
                </div>
            )
        }
    )
    .add(
        'RadioGroup unControlled',
        () => {
            const options1 = ['Apple', 'Orange', 'Pear', 'Banana'];
            const options2 = [
                {
                    label: 'Apple',
                    value: 'apple',
                    disabled: true
                },
                {
                    label: 'Orange',
                    value: 'orange'
                },
                {
                    label: 'Pear',
                    value: 'pear',
                    disabled: true
                },
                {
                    label: 'Banana',
                    value: 'banana'
                }
            ];

            return (
                <>
                    <div className='demo center' style={{display: 'flex', justifyContent: 'center'}}>
                        <span>array[]</span>
                        <RadioGroup options={options1} defaultValue='Banana' onChange={value => console.log(value)} />
                    </div>
                    <div className='demo center' style={{display: 'flex', justifyContent: 'center'}}>
                        <span>array[] disabled</span>
                        <RadioGroup options={options1} defaultValue='Pear' disabled onChange={value => console.log(value)} />
                    </div>
                    <div className='demo center' style={{display: 'flex', justifyContent: 'center'}}>
                        <span>option[]</span>
                        <RadioGroup options={options2} defaultValue='apple' onChange={value => console.log(value)} />
                    </div>
                </>
            )
        }
    )
    .add(
        'RadioGroup controlled',
        () => {
            const fruits = [
                {
                    label: 'Apple',
                    value: 'apple'
                },
                {
                    label: 'Orange',
                    value: 'orange'
                },
                {
                    label: 'Pear',
                    value: 'pear',
                    disabled: true
                },
                {
                    label: 'Banana',
                    value: 'banana'
                }
            ];

            const [fruit, setFruit] = useState('pear');

            const onFruitChange = (params) => {
                setFruit(params.value);
                console.log(params);
            }
            
            const ref = useRef(null);

            const showInfo = () => {
                console.log(ref.current);
            }

            return (
                <>
                    <div className='demo center'>
                        <span>fruit</span>
                        <RadioGroup onChange={onFruitChange} value={fruit} name='fruit'>
                            {
                                fruits.map(option => {
                                    const { label, ...props } = option;
                                    return <Radio key={props.value.toString()} {...props}>{label}</Radio>
                                })
                            }
                        </RadioGroup>
                    </div>
                    <div className='demo center'>
                        <span>animal</span>
                        <RadioGroup ref={ref} options={['bear', 'dog', 'cat', 'pig']} defaultValue='dog' name='animal'/>
                        <Button onClick={showInfo}>showInfo</Button>
                    </div>
                </>
            )
        }
    )
    .add(
        'RadioGroup with button',
        () => {
            return (
                <div className='demo center'>
                    <RadioGroup type='button' options={['bear', 'dog', 'cat', 'pig']} defaultValue='dog' name='animal'/>
                </div>
            )
        }
    )
    