# gc-components
React组件库 [Docs](https://chenguanglin0924.github.io/gc-components)

## 安装  
1. 使用 npm 安装（推荐）
```
npm install gc-components
```
2. 浏览器安装（不推荐）

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `gc` 。  
在 `npm` 发布包内的 `dist` 目录下提供了 `gc-components.min.js` 和 `gc-components.min.css` 。  
> 注意：必须实现引入 `react` 和 `react-dom` 资源文件。

## 使用
1. ES 模块使用（推荐）
```
import { Button } from 'gc-components';
ReactDOM.render(<Button>测试按钮</Button>, mountNode);
```
引入样式
```
import 'gc-components/dist/gc-components.min.css;
```
> 注意：`gc-components` 不会自动引入组件样式，需要手动引入 `css` 或 `less` 文件
2. 浏览器使用（不推荐）  

引入样式
```
<link rel="stylesheet" href="{path}/gc-components.min.css">
```
引入组件库
```
<script src="{path}/gc-components.min.js"></script>
```
组件库提供了全局变量 `gc` ，可通过 `<gc.Component />` 使用
```
ReactDOM.render(<gc.Button>测试按钮</gc.Button>, mountNode);
```

## 按需加载
> 注意：`gc-components` 默认支持基于 ES module 的 tree shaking，不使用以下插件也会有按需加载的效果。  

使用 `babel-plugin-import` 插件
```
// .babelrc or babel-loader option
"plugins": [
    [
        "import",
        {
            "libraryName": "gc-components",
            "libraryDirectory": "es", // "es" | "lib"
            "style": "css"            // "css" | true
        }
    ]
]
```
这里要注意 `style` 属性： 
- style: true 表示从 `style/index.less` 加载样式 
- style: 'css' 表示从 `style/index.css` 加载样式  

引入插件后从 `gc-components` 引入模块
```
import { Button } from 'gc-components';
```
 `babel-plugin-import` 会自动编译为
```
import { Button } from 'gc-components';
import 'gc-components/es/button/style/css';
// import 'gc-components/es/button/style'
```
从而实现组件和样式的按需加载，无需手动引入样式。
## 开发中...
- [ ] Button  
- [ ] Checkbox
- [ ] Radio
- [ ] Select
- [ ] Input
- [ ] Switch
- [ ] Upload
- [ ] Tooltip
- [ ] Tag
- [ ] Tabs
- [ ] Toast
- [ ] Message
- [ ] Divider
