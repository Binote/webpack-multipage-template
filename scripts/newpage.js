const fs = require('../utils/fs')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
// const pagesPath = path.join(__dirname, '../src/pages')
async function newpage () {
  let { pagename, pagetitle } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pagename',
      message: '请输入页面名称:',
      validate: function (value) {
        if (value) {
          return true
        }
        return '文本必须输入!'
      }
    },
    {
      type: 'input',
      name: 'pagetitle',
      message: '请输入页面标题:',
      validate: function (value) {
        if (value) {
          return true
        }
        return '文本必须输入!'
      }
    }
  ])
  const pagesPath = path.join(__dirname, '../src/pages/' + pagename)
  const stat = await fs.getPathStat(pagesPath)
  if (stat) {
    console.log(chalk.red(`错误:页面目录${pagename}已存在，请确认页面名称\n`))
  } else {
    await fs.dirExists(pagesPath)
    try {
      await fs.writeFile(
        path.join(__dirname, '../src/pages/' + pagename + '/index.html'),
        `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${pagetitle}</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
  </head>
  <body>
  </body>
</html>`
      )
      await fs.writeFile(
        path.join(__dirname, '../src/pages/' + pagename + '/index.js'),
        `import $ from 'jquery'
import './index.scss'
import '@/utils/reset.scss'
import flexible from '@/utils/flexible'
$(window).on('resize', resetHeight)
resetHeight()
function resetHeight () {
  flexible(window)
}
if (module.hot) {
  // 实现热更新
  module.hot.accept()
}
`
      )
      await fs.writeFile(
        path.join(__dirname, '../src/pages/' + pagename + '/index.scss'),
        ``
      )
      console.log(chalk.cyan(`创建新页面${pagename}成功！\n`))
    } catch (err) {
      console.log(chalk.red(`出错了！\n`))
      console.error(chalk.red(err))
    }
  }
}
newpage()
