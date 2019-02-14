import $ from 'jquery'
export const host = 'http://iep.sindrax.com/wechat'
// export const host = 'http://121.199.73.102:8084'
/**
 * 获取Query参数
 * @param {string} variable
 */
export const getQueryVariable = variable => {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}
export const urlParser = win => {
  const location = win.location.search.substr(1)
  let url = {}
  let a = location.split('_')
  a.forEach(item => {
    const b = item.split('=')
    url[b[0]] = b[1]
  })
  return url
}
/**
 * 展示信息
 * @param {string} str
 * @param {function} callback
 */
export const showMessage = (str, callback) => {
  var neelerErrmsg = $('#neelerErrmsg')
  if (!neelerErrmsg.length) {
    setMessage()
    neelerErrmsg = $('#neelerErrmsg')
  }
  if (window.neelerFlag) {
    return
  }
  neelerErrmsg.text(str).fadeIn('slow', function () {
    window.neelerFlag = true
    setTimeout(function () {
      neelerErrmsg.fadeOut('slow')
      window.neelerFlag = false

      if (callback !== undefined && callback !== '') {
        setTimeout(function () {
          callback()
        }, 500)
      }
    }, 500)
  })
}

function setMessage () {
  var neelerErrmsg = $('<div></div>')
    .attr('id', 'neelerErrmsg')
    .css({
      display: 'none',
      fontSize: '0.3rem',
      position: 'fixed',
      top: '5rem',
      left: '30%',
      width: '45%',
      height: '50px',
      border: '1px solid #000',
      'border-radius': '10px',
      'line-height': '50px',
      'text-align': 'center',
      background: '#000',
      opacity: '0.6',
      filter: 'alpha(opacity=60)',
      color: '#FFF',
      'z-index': '999999'
    })
  $('body').prepend(neelerErrmsg)
}

// 微信设置
export const wxConfig = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url:
        'http://offaccount.sindrax.com/platform/getJsTicket?url=' +
        window.location.href,
      success: res => {
        resolve(res)
      },
      error: err => {
        reject(err)
      }
    })
  })
}
