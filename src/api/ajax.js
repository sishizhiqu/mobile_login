/* 
 该文件是对axios的二次封装，目的是：统一处理请求错误，返回服务器的纯数据
*/
import axios from 'axios'
import { Toast } from 'antd-mobile'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//使用axios的请求拦截器
axios.interceptors.request.use((config) => {
    NProgress.start()
    return config
})

//使用axios的响应拦截器
axios.interceptors.response.use(
    response => {
        NProgress.done();
        return response.data },
    error => {
        NProgress.done();
        Toast.show({
            icon: 'fail',
            content: error.message,
          })
        return new Promise(()=>{})
    }
)

export default axios