import React from 'react';
import { Button } from '../components/index';
import '../components/button/style';
import { storiesOf } from '@storybook/react';

storiesOf('按钮', module)
  .add('基本',() => (
    <Button>测试按钮</Button>
  )
)
