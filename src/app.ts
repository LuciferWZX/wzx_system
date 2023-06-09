import React from "react";
import {ConfigProvider, theme} from "antd";
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import {StoreKey} from "@/types/StoreKey";
import 'dayjs/locale/zh-cn';
import {createGlobalStyle, history} from "umi"
import {ResCode} from "@/types/APIResponseType";
import {useUserStore} from "@/stores";
import {handleInitData} from "@/utils/handleInitData";
import {useDBStore} from "@/stores/databaseStore";
import db_config from "@/idb/dbConfig.json";
import {WindowActionType} from "@/types/electron/WindowActionType";
import {handleMainWin} from "@/utils/electron";

export const getInitialState = async ()=>{
    console.log("[我使用了git submodule]")
    console.log("[versions]:",{
        node:window.versions.node(),
        chrome:window.versions.chrome(),
        electron    :window.versions.electron(),
    })
    await initDatabase()
    console.log("[初始化数据：开始]")
    await initUser()
    console.log("[初始化数据：结束]")
    handleMainWin(WindowActionType.show)
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
        console.log("[token不存在]",)
        history.replace("/auth/login")
        handleMainWin(WindowActionType.show)
        return null
    }
    const {setState:setUserState,getState:getUserState}=useUserStore
    setUserState({token:token})
    //初始化用户的数据
    const res = await getUserState().profile()

    if (res.code!== ResCode.success){
        setUserState({user:null})
        history.replace("/auth/login")
        handleMainWin(WindowActionType.show)
        return
    }
    //初始化用户的一些数据
    await handleInitData()

}
const initDatabase=async ()=>{
    const {dbName,version,storeNames} =db_config
    const {database}=useDBStore.getState()
    await database.init(dbName,version,storeNames)
}


