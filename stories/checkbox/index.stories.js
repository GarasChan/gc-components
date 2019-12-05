import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox, Button } from '../../components/index';
import '../../components/checkbox/style';

storiesOf('Checkbox', module)
    .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
    .add(
        'unControlled',
        () => {
            return (
                <div className='demo'>
                    <Checkbox defaultChecked={true} onChange={(checked) => console.log(checked)}>Checked</Checkbox>
                    <Checkbox onChange={(checked) => console.log(checked)}>unChecked</Checkbox>
                    <Checkbox defaultChecked={true} disabled onChange={(checked) => console.log(checked)}>Checked disabled</Checkbox>
                    <Checkbox defaultChecked={false} disabled onChange={(checked) => console.log(checked)}>unChecked disabled</Checkbox>
                </div>
            )
        }
    )
    .add(
        'controlled',
        () => {
            const [checked, setChecked] = useState(false);
            const [disabled, setDisabled] = useState(false);

            const onChange = (value) => {
                setChecked(value);
            }

            return (
                <div className='demo'>
                    <Checkbox checked={checked} onChange={onChange} disabled={disabled}>Controlled</Checkbox>
                    <Button onClick={() => {setChecked(checked => !checked)}}>{checked ? 'UnCheck' : 'Check'}</Button>
                    <Button onClick={() => {setDisabled(disabled => !disabled)}}>{disabled ? 'Disabled' : 'Enable'}</Button>
                </div>
            )
        }
    )
    .add(
        'ref',
        () => {
            const checkboxRef = useRef(null);

            const getInfo = () => {
                console.log(checkboxRef.current)
            }

            return (
                <div className='demo'>
                    <p>请看控制台</p>
                    <Checkbox ref={checkboxRef} id='animate' description='是否显示动画'>Checkbox</Checkbox>
                    <Button type='primary' onClick={getInfo}>获取Checkbox信息</Button>
                </div>
            )
        }
    )