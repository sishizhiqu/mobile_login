/* 
    统一管理项目中的所有ajax请求
*/

import ajax from './ajax'

//请求验证码
export const reqVerifyCode = (phone) => ajax.post('http://localhost:3000/login/digits',{phone})

//请求登录
export const reqLogin = (phone,code) => ajax.post('http://localhost:3000/login/phone',{phone,code})

//请求校验用户身份
export const reqVerifyToken = () => ajax.post('http://localhost:3000/login/verify')

//退出登录
export const reqLogout = (_id) => ajax.post('http://localhost:3000/logout',{_id})