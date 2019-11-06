import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button } from '../../components/index';
import '../../components/button/style';
import README from './README.md';

storiesOf('Button', module)
  .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
  .addDecorator(withKnobs)
  .add(
    'theme', 
    () => {
      const children = text('children', 'test');
      const props = {
        type: select('type', { default: 'default', primary: 'primary', }, 'default'),
        disabled: boolean('disabled', false),
        onClick: action('button-click')
      }
      return <Button {...props}>{children}</Button>
    },
    {
      readme: {
        content: README
      }
    }
  )
  .add(
    'link',
    () => {
      const children = text('children', 'test');
      const props = {
        href: text('href', 'https://chenguanglin0924.github.io/gc-components'),
        target: text('target', '_blank'),
        disabled: boolean('disabled', false)
      }
      return <Button {...props}>{children}</Button>
    }
  )