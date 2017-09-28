
//黑光网api  => config/index.js node代理转发解决跨域
export const API = '/api.php';

//蜂鸟api
export const API2 = '/ajax';

//封装ajax请求
import {AjaxPlugin} from 'vux'
export const httpRequest =  function(url, params, cb ,ce) {
  let dataStr = ''
  for (let key in params) {
    dataStr += key + '=' + params[key]
  }
  dataStr = dataStr.substr(0, dataStr.length - 1)

  AjaxPlugin.$http.post(url, dataStr)
  .then((response) => {
    if (cb) cb(response.data)
  })
  .catch((response) => {  
	    if (ce) ce(response) 
	})  
}

export default {
  components: {
    AjaxPlugin
  }
}
