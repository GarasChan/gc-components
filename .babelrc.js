const presets = [
    "@babel/env",
    "@babel/react",
    "@babel/typescript"
];
const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import"
];

module.exports = { presets, plugins };