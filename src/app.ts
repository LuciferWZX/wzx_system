import React from "react";
import {ConfigProvider, theme} from "antd";
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import {StoreKey} from "@/types/StoreKey";
import 'dayjs/locale/zh-cn';
import {createGlobalStyle, history} from "umi"
import userState from "@/stores/user.store"
import {ResCode} from "@/types/APIResponseType";

export const getInitialState = async ()=>{
    console.log("[初始化数据：开始]")
    await initUser()
    console.log("[初始化数据：结束]")
}
export const rootContainer=(container:React.ReactNode)=> {
    dayjs.locale('zh-cn'); //dayjs设置中文
    return React.createElement(ConfigProvider, {
        locale:zhCN,
        theme:{
            // algorithm:theme.darkAlgorithm
            algorithm:theme.defaultAlgorithm,
        }
    }, container);
}
export const styledComponents = {
    GlobalStyle: createGlobalStyle`
        html,body,#root{
          margin: 0;
          padding: 0;
          height: 100%;
          min-width: 600px;
        }
  `
}

/**
 * 初始化用户信息
 */
const initUser=async ()=>{
    const store = require("storejs")
    const token:string|undefined = store.get(StoreKey.Auth)
    if (!token){
        console.warn("[token不存在]:",token)
        history.replace("/auth/login")
        return null
    }
    userState.state.token = token
    //初始化用户的数据
    const res = await userState.action.profile()
    if (res.code!== ResCode.success){
        history.replace("/auth/login")
    }
}
