import React, { Component } from 'react'
import {Route,Routes, Navigate} from 'react-router-dom'
// import {WechatOutlined} from '@ant-design/icons';
import {pageRoutes,otherRoutes} from './routes'
import './App.less'
import './utils/rem'

// import 'antd/dist/antd.css'; 

export default class App extends Component {

  render() {
    return (
      <div>
        
        <Routes>
            {
                pageRoutes.map((routeObj)=>{
                   return <Route key={routeObj.path} {...routeObj}></Route>
                })
            }
            {/* 兜底 */}
            <Route path='/*' element={<Navigate to='/login' />}></Route>
        </Routes>
        
      </div>
    )
  }
}
