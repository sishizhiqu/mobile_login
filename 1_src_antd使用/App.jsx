import React, { Component } from 'react'
import { DatePicker,Button,Input,message } from 'antd';
import {WechatOutlined} from '@ant-design/icons';
import './App.less'
// import 'antd/dist/antd.css'; 

export default class App extends Component {
    success = ()=>{
        message.success('操作成功');
    }
    failed = ()=>{ 
        message.error('删除失败');
    }
  render() {
    return (
      <div>
        <button class="demo">点我</button>
        <DatePicker />
        <Button onClick={this.success} type="primary">确认</Button>
        <Button onClick={this.failed} type="danger">取消</Button>
        <WechatOutlined />
        <Input placeholder="请输入用户名" style={{width: '300px'}} />
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
      </div>
    )
  }
}
