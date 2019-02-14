const Koa = require('koa')
const http = require('http')
const app = new Koa()
const ip = require('ip')
const config = require('../config')
const serve = require('koa-static')
const normalizePort = function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

const port = normalizePort(config.webserver.port)
// 1.主页静态网页 把静态页统一放到public中管理
const home = serve(config.build.assetsRoot)
// ip
const host = config.webserver.env === 'development' ? '0.0.0.0' : '127.0.0.1'
app.use(home)
const server = http.createServer(app.callback())
// 启动服务
server.listen(port, host)

// 错误处理
server.on('error', err => {
  if (err.syscall !== 'listen') {
    throw err
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (err.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw err
  }
})

// 监听
server.on('listening', () => {
  const address = ip.address()
  if (config.webserver.debug) {
    console.log()
    console.log(`Server is running at http://127.0.0.1:${port}`)
    console.log(`Server is running at http://${address}:${port}`)
  }
})
