## 指南

### 起步
**webpack.config.js**
```js
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist') 
  }
}
```
- `module.exports`:  CommonJS 模块下的 module 对象
- `entry`: 入口
- `output`: 出口
  - `filename`: 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。**对于单个入口起点，filename 会是一个静态名称。**
  - `path`: `output` 目录对应一个绝对路径
- `require('path')`: `path` 模块提供了一些实用工具，用于处理文件和目录的路径。
  - `path.resolve`: 方法会将路径或路径片段的序列解析为绝对路径
  ```js
  path.resolve('/目录1/目录2', './目录3');
  // 返回: '/目录1/目录2/目录3'

  path.resolve('/目录1/目录2', '/目录3/目录4/');
  // 返回: '/目录3/目录4'

  path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif');
  // 如果当前工作目录是 /目录A/目录B，
  // 则返回 '/目录A/目录B/目录1/目录2/目录4/文件.gif'
  ```
- 文件路径
  - `__dirname`: 获得当前执行文件所在目录的完整目录名
  - `__filename`: 获得当前执行文件的带有完整绝对路径的文件名
  - `process.cwd()`: 获得当前执行node命令时候的文件夹目录名 
  - `./`: 文件所在目录

  ### 管理资源

```js
const path = require('path')
const toml = require('toml'); 
const yaml = require('yamljs');
const json5 = require('json5')
console.log(json5)
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
      {
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  }
}
```           