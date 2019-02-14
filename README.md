# webpack-multipage-template

> A webpack multipage template project

## 项目初始化

```bash
# 安装依赖
yarn install

# 运行开发模式
yarn run dev

# 编译打包项目
yarn run build

# 允许交互式git脚本，规范git提交
yarn run git
```

### pages 下面需要建立页面包，页面为包下同名的 html 文件，入口为同名的 js 文件，css 在 js 中引用

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
├── src
│   └── config // 页面全局配置信息
│   └── lib // 第三方工具
│   └── pages // 页面目录
│   └── static // 静态资源目录
│   └── utils // 自定义工具库
├── .babelrc // babel配置文件
├── .eslintignore // eslint忽略
├── .eslintrc // eslint配置文件
├── .gitignore // git提交忽略
├── .postcssrc // postcss配置文件
├── package-lock.json
└── package.json

```
