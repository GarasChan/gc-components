# gc-components
React + ReactHooks Components  
Docs: https://chenguanglin0924.github.io/gc-components

# 按需加载
1. 如果你没使用` babel `，那么你可以按照以下方法写，实现组件和样式按需加载：
```
import Button from 'gc-components/es/button';  // 或 import { Button } from 'gc-components';
import 'gc-components/es/button/style';        // 加载 less 文件
// gc-components/es/button/style/css;          // 加载 css 文件
```
2. 如果你使用了` babel `，那么可以使用` babel-plugin-import `来进行按需加载，引入这个插件后，在` babel `中添加以下配置：
```
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
这里要注意 style 属性： 
- style: true 表示从 style/index.less 加载样式 
- style: 'css' 表示从 style/index.css 加载样式  
然后 ` import { Button } from 'gc-components'; ` 即可实现组件和样式按需加载。
