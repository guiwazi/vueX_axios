import axios from 'axios'
const getCookie = (name) => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let matchResult = document.cookie.match(reg)
  return matchResult ? matchResult[2] : ''
}
const fetch = (url, params, method = 'post') => {
  url = `/api/${url}`
  return new Promise((resolve, reject) => {
    let config = {
      url: url,
      method: method,
      headers: {
        'x-csrf-token': getCookie('hw-csrfToken')
      }
    }
    if (method.match(/get|delete|head/)) {
      config.params = params
    } else {
      config.data = params
    }
    axios(config).then(res => resolve(res.data), err => {
      if (err.response) {
        resolve(err.response.data)
      } else {
        resolve({errors: [{message: '断网啦!!!!!!!!!'}]})
      }
    })
  })
}

export default ((array) => {
  return array.reduce((a, b) => {
    a[b] = (url, params) => fetch(url, params, b)
    return a
  }, {})
})(['get', 'post', 'delete', 'patch', 'put'])
