/* eslint-disable no-irregular-whitespace */
const path = require('path');
const { name, version, description } = require('../package.json');

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

const logo = `
                          ╔═╗
╔═╦═╗ ╔═╦═╦══╦═╦═╦═╦═╦═╦══╣═╣
║║║╠╬═╣╠╣║║║║║║║║║║║╩╣║╠╗╔╬═║
╠╗╠═╝ ╚═╩═╩╩╩╣╔╩═╩╩╩═╩╩╝╚╝╚═╝
╚═╝　　　　　 ╚╝　　　　　　　　　　　　　　　　
`;

module.exports = { resolve, name, version, description, logo };
