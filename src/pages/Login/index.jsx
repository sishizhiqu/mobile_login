import React, { useState ,useEffect} from 'react'
import {  useNavigate } from "react-router-dom";
import { NavBar, Input, Button, Toast } from 'antd-mobile'
import { reqVerifyCode, reqLogin } from '../../api'
import github from './imgs/github.png'
import qq from './imgs/qq.png'
import wechat from './imgs/wechat.png'
import logo from './imgs/logo.svg'
import './index.less'
import { phoneReg, verifyCodeReg } from '../../utils/reg'


export default function Login() {
  const [phone, setPhone] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  let [time, setTime] = useState(10)
  const [canClick, setCanClick] = useState(true)
  const navigate = useNavigate();
  let timer;
  /*   state = {
      phone: '',
      verifyCode: '',
      time: 60,
      canClick: true
    } */

  //保存数据
  function saveData(type) {
    return (value) => {
      //如果用户输入的数据符合要求，维护进状态
      if(type === 'phone'){
        if(phoneReg.test(value)) return setPhone(value)
        setPhone('')
      }
      if(type === 'verifyCode'){
        if(verifyCodeReg.test(value)) return setVerifyCode(value)
        setVerifyCode('')
      }
      
      /* if (type === 'phone' && phoneReg.test(value)) return setPhone(value) 
      else setPhone('')
      if (type === 'verifyCode' && verifyCodeReg.test(value)) return setVerifyCode(value)
      else setVerifyCode('') */
      // setPhone('')
      // setVerifyCode('')
    }
  }

  //获取验证码
  async function getVerifyCode() {
    //获取手机号
    // const { phone } = this.state
    //校验手机号
    if (!phone) return Toast.show({
      icon: 'fail',
      content: '手机号不合法',
    })
    // this.setState({ canClick: false })
    setCanClick(false);
    //开启定时器，更新倒计时
    timer = setInterval(() => {
      // let { time } = this.state
      if (time > 0) { time--; setTime(time) }
      else { //倒计时结束
        clearInterval(timer);
        setCanClick(true)
        setTime(10)
        // this.setState({ canClick: true, time: 60 })
      }

    }, 1000);
    //发送请求
    await reqVerifyCode(phone)
    Toast.show({
      icon: 'success',
      content: '验证码发送成功',
    })
  }

  //登录
  async function login() {
    //获取手机号，验证码
    // const { phone, verifyCode } = this.state
    const result = await reqLogin(phone, verifyCode)
    const { code, message } = result
    
    if (code === 20000) {
      Toast.show({
        icon: 'success',
        content: '登陆成功',
      })
      navigate('/usercenter')
    } else {
      Toast.show({
        icon: 'fail',
        content: message,
      })
    }

  }

  //github登录
  function githubLogin(){
    window.location.href='https://github.com/login/oauth/authorize?client_id=a0a533650c559e33c79e'
  }

  useEffect(()=>{
    return ()=>{
      clearInterval(timer)
    }
  },[])
  
  // const { phone, verifyCode, time, canClick } = this.state
  return (
    <div className='login'>
      {/* 顶部导航区 */}
      <header>
        <img className="logo" src={logo} alt="" />
        <NavBar className="title" backArrow={false}>Cupops</NavBar>
      </header>

      {/* 手机号输入框 */}
      <Input onChange={saveData('phone')} className="phone-number" placeholder='请输入手机号' />

      {/* 手机验证码输入框 */}
      <div className='verify-wrap'>
        <Input onChange={saveData('verifyCode')} className="verify-code" placeholder='请输入验证码' clearable />
        <Button style={canClick ? '' : { pointerEvents: 'none', border: 'none', color: '#999' }}
          onTouchStart={getVerifyCode}
          className="verify-get" color='primary' fill='solid'
        >获取验证码{canClick ? '' : `(${time})`}</Button>
      </div>

      <Button
        onTouchEnd={login}
        block color='primary' size='large'
        style={(phone && verifyCode) ? { pointerEvents: 'auto' } : { pointerEvents: 'none', opacity: 0.5 }}
      >登录</Button>

      <footer className='footer'>
        <span className='other'>其他登录方式</span>
        <div className='login-type'>
          <img onTouchEnd={githubLogin} src={github} alt="" />
          <img src={qq} alt="" />
          <img src={wechat} alt="" />
        </div>
        <span className='policy'>未注册的手机号，验证后会自动创建账号，登录即代表您同意
          <a href="https://www.baidu.com">《隐私政策》</a>
        </span>
      </footer>



    </div>
  )

}
