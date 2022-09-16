/*  
  个人中心组件
*/
import React, { useEffect,useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { reqLogout, reqVerifyToken } from '../../api'
import { NavBar,Toast,Button} from 'antd-mobile'
import './index.less'

export default function UserCenter() {
  const [nickName,setNickName] = useState('')
  const [phone,setPhone] = useState('')
  const [avatar,setAvatar] = useState('')
  const navigate = useNavigate();
  const _idRef = useRef()

  useEffect(() => {
    async function fetchData() {
      const result = await reqVerifyToken();
      const { code,message,data } = result;
      // console.log(result)
      // console.log(code,message,data)
      
      if (code !== 20000){
        Toast.show({
            icon: 'fail',
            content: message,
          })
        navigate('/login')
      }
      else{
        const {nickName,phone,avatar,_id} = data
        setNickName(nickName)
        setPhone(phone)
        setAvatar(avatar)
        _idRef.current = _id
      }
    }
    fetchData()
  }, [])

  async function logout(){
    console.log(_idRef.current)
    await reqLogout(_idRef.current)
    navigate('/login')
  }

  return (
    <div className='use-info'>
      <NavBar className="title" >个人中心</NavBar>
      <img className="avatar" src={avatar} alt="" />
      <div className='nick-name'>昵称：{nickName}</div>
      <Button onClick={logout} block color='primary' size='large'>退出登录</Button>
    </div>
  )

}
