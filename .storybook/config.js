import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { create } from '@storybook/theming';
import { addReadme } from 'storybook-readme';
import README from '../README.md';

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withInfo);
addDecorator(addReadme);

// 参数配置
addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
    theme: create({
      base: 'light',
      brandTitle: 'gc-components',
      brandUrl: 'https://garaschan.online',
      brandImage: 'https://garaschan.online/assets/images/logo.png',
    })
  },
  info: {
    inline: true
  },
  knobs: {
    timestamps: true,
    escapeHTML: true
  },
  readme: {
    codeTheme: 'a11y-dark', // 'xonokai'
    DocPreview: ({children}) => <div style={{padding: '20px 40px'}}>{children}</div>,
    // sidebar: README
  }
});

configure(loadStories, module);