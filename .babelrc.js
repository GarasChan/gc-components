let loose = false,
    modules = false,
    useESModules = false;
switch (process.env.BABEL_ENV) {
    case "cjs":
        loose = true;
        modules = "cjs";
        useESModules = false;
        break;
    case "es":
        loose = true;
        modules = false;
        useESModules = true;
        break;
    default:
        loose = false;
        modules = false;
        useESModules = false;        
}

const presets = [
    [
        "@babel/preset-env", { 
            loose, 
            modules 
        }
    ], 
    "@babel/preset-react"
];
const plugins = [
    [
        "@babel/plugin-transform-runtime", { 
            useESModules 
        }
    ],
    '@babel/plugin-proposal-class-properties',
    "react-docgen"
];

module.exports = { presets, plugins };