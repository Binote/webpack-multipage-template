# webpack-multipage-template

> A webpack multipage template project

### 开箱即用的 webpack 多页面项目模板

## 项目初始化

```bash
# 克隆项目
git clone git@github.com:Binote/webpack-multipage-template.git

#删除远程源
git remote rm origin

#增加自己的仓库地址
git remote add origin https://USERNAME:PASSWORD@github.com/USERNAME/pro.git

# 安装依赖
yarn install

# 运行开发模式
yarn run dev

# 编译打包项目
yarn run build

# 允许交互式git脚本，规范git提交
yarn run git

# 启用koa静态服务器
yarn run start

# 新增页面模板
yarn run newpage

# eslint代码验证
yarn run lint

# eslint代码验证并修复
yarn run lint:fix

```

### pages 下面需要建立页面包，页面为包下 index.html 或者包名.html 文件，入口为 idnex.js 或者包名.js 文件，css 在 js 中引用

> 主文件为 index 或者包名任选一个，不能同时出现

### 目录结构

```
├── README.md
├── build  // webpack打包配置文件目录
│   └── build.js // webpack打包脚本
│   └── entry-htmlPlugin.js // webpack多入口爬虫脚本
│   └── utils.js // webpack工具文件
│   └── webpack.base.conf.js // webpack基础配置
│   └── webpack.dev.conf.js // webpack开发模式配置
│   └── webpack.prod.conf.js // webpack生产模式配置
├── config // webpack config
├── dist // webpack打包资源输出目录
├── scripts // 脚本目录
│   └── config // 脚本配置信息
│   └── git-commit.js // git交互式规范提交脚本
│   └── webserver.js // koa静态服务器脚本
│   └── newpage.js // 新增页面模板脚本
├── src
│   └── config // 页面全局配置信息
│   └── lib // 第三方工具
│   └── pages // 页面目录
│   └── static // 静态资源目录
│   └── utils // 自定义工具库
├── utils //自定义node工具库
│   └── fs // promise版fs
├── .babelrc // babel配置文件
├── .eslintignore // eslint忽略
├── .eslintrc // eslint配置文件
├── .gitignore // git提交忽略
├── .postcssrc // postcss配置文件
├── package-lock.json
└── package.json

```
