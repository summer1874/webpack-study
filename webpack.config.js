// 起步

/*

:::TIP
`path.resolve` 方法会将路径或路径片段的序列解析为绝对路径。

 path.resolve('/目录1/目录2', './目录3')  
 返回: '/目录1/目录2/目录3'
 path.resolve('/目录1/目录2', '/目录3/目录4/') 
 返回: '/目录3/目录4'
 path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif')  
 如果当前工作目录是 /目录A/目录B 则返回 '/目录A/目录B/目录1/目录2/目录4/文件.gif
 
`__dirname`     获得当前执行文件所在目录的完整目录名
` __filename`   获得当前执行文件的带有完整绝对路径的
`process.cwd()` 获得当前执行node命令时候的文件夹
:::

*/

// // path 模块提供了一些实用工具，用于处理文件和目录的路径。
// const path = require('path') 
// // module.exports： CommonJS 模块下的 module 对象
// module.exports = {
//   // 入口
//   entry: './src/index.js',
//   // 出口
//   output: {
//     // 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。对于单个入口起点，filename 会是一个静态名称。
//     filename: 'main.js',
//     // 目录对应一个绝对路径
//     path: path.resolve(__dirname, 'dist')
//   }
// }

// 资源管理

// const path = require('path')
// const toml = require('toml') 
// const yaml = require('yamljs')
// const json5 = require('json5')
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   /**
//    * module （模块）
//    * 模块 loader 可以链式调用。链中的每个 loader 都将对资源进行转换。
//    * 链会逆序执行。第一个 loader 将其结果（被转换后的资源）传递给下一个 loader，依此类推。
//    * 最后，webpack 期望链中的最后的 loader 返回 JavaScript。
//    * */ 
//   module: { 
//     // 规则数组，当规则匹配时使用。
//     rules: [
//       {
//         // 引入所有通过断言测试的模块。
//         test: /\.css$/, 
//         // 可以是一个应用于模块的 UseEntries 数组。每个入口(entry)指定使用一个 loader。
//         use: [ 
//           'style-loader',
//           'css-loader',
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: [
//           'file-loader',
//         ],
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/,
//         use: [
//           'file-loader',
//         ],
//       },
//       {
//         test: /\.(csv|tsv)$/,
//         use: [
//           'csv-loader',
//         ],
//       },
//       {
//         test: /\.xml$/,
//         use: [
//           'xml-loader',
//         ],
//       },
//       // 自定义 JSON 模块 parser
//       // 通过使用 自定义 parser 替代特定的 webpack loader，可以将任何 toml、yaml 或 json5 文件作为 JSON 模块导入。
//       {
//         test: /\.toml$/,
//         type: 'json',
//         // 解析选项对象。所有应用的解析选项都将合并。
//         parser: { 
//           // 如果 Rule.type 被设置成 ‘json’，那么 Rules.parser.parse 选择可能会是一个方法，
//           // 该方法实现自定义的逻辑，以解析模块的源和并将它转换成 JavaScript 对象。
//           parse: toml.parse 
//         }
//       },
//       {
//         test: /\.yaml$/,
//         type: 'json',
//         parser: {
//           parse: yaml.parse
//         }
//       },
//       {
//         test: /\.json5$/,
//         type: 'json',
//         parser: {
//           parse: json5.parse
//         }
//       }
//     ]
//   }
// }








// 管理输出

// :::TIP
// webpack 和 webpack 插件似乎“知道”应该生成哪些文件。答案是，webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射。
// :::

const path = require('path')
// 设置 HtmlWebpackPlugin  简化了HTML文件的创建，以便为你的webpack包提供服务。
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理 /dist 文件夹 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // 动态加载的模块 多个入口起点
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    // 在每次构建前清理 /dist 文件夹
    new CleanWebpackPlugin(),
    // 生成index.html 文件, 替换原有文件
    new HtmlWebpackPlugin({
      title: '管理输出',
    }),
  ],
  output: {
  /** 当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，
    * 应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称…  
    * function (pathData, assetInfo) => string [name] 
    * [name] => pathData.Chunk.name  
    * [id] =>  pathData.Chunk.id   使用内部 chunk id
    * [contenthash] => pathData.Chunk.id 使用由生成的内容产生的 hash
    * [name].[contenthash].bundle.js'  结合多个替换组合使用
    * 使用函数返回 filename
    * filename: (pathData) => {
    *  return pathData.chunk.name === 'main' ? '[name].js': '[name]/[name].js'
    * }
    */
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}

