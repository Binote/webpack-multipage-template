let fs = require('fs')
let path = require('path')

let myfs = {
  /**
   * [通过Promise写入数据]
   * @param  {String} file [文件名]
   * @param  {Object} obj  [写入的数据（对象）]
   * @return {Object}      [Promise对象]
   */
  writeFile (filename, obj) {
    let that = this
    let promise = new Promise(async (resolve, reject) => {
      await that.dirExists(path.parse(filename).dir)
      fs.writeFile(filename, obj, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve('write success!')
        }
      })
    })
    return promise
  },

  /**
   * [通过Promise读取存储的数据]
   * @param  {String} file [文件名]
   * @return {Object}      [Promise对象]
   */
  readFile (filename) {
    let promise = new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
    return promise
  },
  /**
   * [通过Promise读取存储的数据]
   * @param  {String} file [文件名]
   * @return {Object}      [Promise对象]
   */
  copyFile (filename, targetFilename) {
    let that = this
    return new Promise((resolve, reject) => {
      that
        .readFile(filename)
        .then(res => {
          that
            .writeFile(targetFilename, res)
            .then(res => {
              resolve('success:copy ' + filename + ' to ' + targetFilename)
            })
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * [获取路径是否存在]
   * @param {String} path [路径]
   */
  getPathStat (path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false)
        } else {
          resolve(stats)
        }
      })
    })
  },
  /**
   * [创建文件夹]
   * @param {String} dir
   */
  mkdir (dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  },
  /**
   * [回调生成路径]
   * @param {String} dir
   */
  async dirExists (dir) {
    let isExists = await this.getPathStat(dir)
    // 如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
      return true
    } else if (isExists) {
      // 如果该路径存在但是文件，返回false
      return false
    }
    // 如果该路径不存在
    let tempDir = path.parse(dir).dir // 拿到上级路径
    // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await this.dirExists(tempDir)
    let mkdirStatus
    if (status) {
      mkdirStatus = await this.mkdir(dir)
    }
    return mkdirStatus
  }
}

module.exports = myfs
