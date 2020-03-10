module.exports = {
    // 定义ESLint的解析器
    parser: '@typescript-eslint/parser',
    // 定义文件继承的子规范
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    // 定义该eslint文件所依赖的插件
    plugins: [
        '@typescript-eslint',
        'react',
        'prettier'
    ],
    root: true,
    // 指定代码的运行环境
    env: {
        browser: true,
        node: true,
    },
    settings: {
        // 自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    // 指定ESLint解析参数
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    // 指定ESLint解析规则
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        '@typescript-eslint/no-explicit-any': 0,
        // 不允许出现debugger语句
        'no-debugger': 2,
        // 函数定义的时候不允许出现重复的参数
        "no-dupe-args": 2,
        // 对象中不允许出现重复的键
        "no-dupe-keys": 2,
        // switch语句中不允许出现重复的case标签
        "no-duplicate-case": 2,
        // 不允许出现空的代码块
        "no-empty": 2,
        // 在return，throw，continue，break语句后不允许出现不可能到达的语句
        "no-unreachable": 2,
        // 比较的时候使用严格等于
        "eqeqeq": ["error", "always"],
        // 不允许使用eval()
        "no-eval": 2,
        // 不允许使用隐式eval()
        "no-implied-eval": 2,
        // 不允许不必要的嵌套代码块
        "no-lone-blocks": 2,
        // 不允许在循环语句中进行函数声明
        "no-loop-func": 2,
        // 不允许变量重复声明
        "no-redeclare": 2,
        // 不允许抛出字面量错误 throw "error"
        "no-throw-literal": 2,
        // js关键字和保留字不能作为函数名或者变量名
        "no-shadow-restricted-names": 2,
        // 不允许未声明的变量
        "no-undef": 2,
        // 强制驼峰命名规则
        "camelcase": [2, { "properties": "never" }],
        "prefer-const": 1,
        // 使用let和const代替var
        "no-var": 2,
        //不允许在嵌套代码块里声明函数
        "no-inner-declarations": [2, "functions"],
        // 推荐使用es6结构语法赋值
        "prefer-destructuring": ["error", { "array": true, "object": true }],
        // 在构造函数中需要`super()`调用
        "constructor-super": 1,
        // //或/*后面必须至少有一个空格
        "spaced-comment": [1, "always"]
    },
};