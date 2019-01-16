const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * 映射 d 文件夹下的文件为模块
 */
const mapDir = d => {
  const tree = {
    entry: {},
    devHtmlWebpackPlugin: [],
    HtmlWebpackPlugin: []
  };

  // 获得当前文件夹下的所有的文件夹和文件
  const [dirs, files] = _(fs.readdirSync(d)).partition(p =>
    fs.statSync(path.join(d, p)).isDirectory()
  );

  // 映射文件夹;
  // dirs.forEach(dir => {
  //   tree[dir] = mapDir(path.join(d, dir));
  // });
  // console.log(files);
  dirs.forEach(dir => {
    const [pagesDirs, pagesFiles] = _(
      fs.readdirSync(path.join(d, dir))
    ).partition(p => fs.statSync(path.join(d, dir, p)).isDirectory());
    pagesFiles.forEach(file => {
      if (file === dir + ".js") {
        tree.entry[dir] = path.join(d, dir, file);
      } else if (file === dir + ".html") {
        tree.HtmlWebpackPlugin.push(
          new HtmlWebpackPlugin({
            filename: file,
            template: path.join(d, dir, file),
            inject: true,
            chunks: [dir],
            inlineSource: ".(js|css)$",
            minify: {
              //删除Html注释
              removeComments: true,
              //去除空格
              collapseWhitespace: true,
              //去除属性引号
              removeAttributeQuotes: false
            },
            chunksSortMode: "dependency"
          })
        );
        tree.devHtmlWebpackPlugin.push(
          new HtmlWebpackPlugin({
            filename: file,
            template: path.join(d, dir, file),
            inject: true,
            chunks: [dir],
            inlineSource: ".(js|css)$",
            chunksSortMode: "dependency"
          })
        );
      }
    });
  });

  return tree;
};
// console.log(mapDir(path.join(__dirname, "../src/pages")));
// 默认导出当前文件夹下的映射
module.exports = mapDir(path.join(__dirname, "../src/pages"));
