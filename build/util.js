const path = require('path');
let { name, version, description } = require('../package');

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

const logo = `
                          ╔═╗
╔═╦═╦═╦═╦═╦══╦═╦═╦═╦═╦═╦══╣═╣
║║║╠╬═╣╠╣║║║║║║║║║║║╩╣║╠╗╔╬═║
╠╗╠═╝ ╚═╩═╩╩╩╣╔╩═╩╩╩═╩╩╝╚╝╚═╝
╚═╝　　　　　 ╚╝　　　　　　　　　　　　　　　　
`

module.exports = {
    resolve,
    name,
    version,
    description,
    logo
}