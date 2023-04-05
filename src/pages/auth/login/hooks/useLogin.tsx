import React, {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {Avatar, Typography, Space} from "antd";
import {login} from "@/services/api/auth";
import {ResCode} from "@/types/APIResponseType";
import {Icon,history} from "umi";
import userStore from "@/stores/user.store";
import {delay} from "@/utils/delay";
import {MessageInstance} from "antd/es/message/interface";
import {NotificationInstance} from "antd/es/notification/interface";
import {showLoginNotification} from "@/pages/auth/common";
const {Text}=Typography
const useLogin = (messageApi:MessageInstance,notification:NotificationInstance) => {
    const [failedCount, setFailedCount] = useState<number>(0);
    const handleLogin=async (params:{type:"password"|"verifyCode",way:string,value:string})=>{
        if (failedCount >= 2){
            messageApi.open({
                type:"error",
                icon:<Icon icon={"material-symbols:cancel-rounded"} className={"anticon"} />,
                content:"操作过于频繁，请稍后再试",
                key:"login"
            })
            return
        }
        messageApi.open({
            type:"loading",
            content:"正在登录...",
            duration:0,
            key:"login"
        })
        await delay(1000)
        const res = await login(params)
        if (res.code !== ResCode.success){
            setFailedCount(failedCount+1)
            let message = res.message
            if (res.data?.failedCount){
                message = `${message},剩余次数还剩 ${res.data.failedCount} 次`
            }
            messageApi.open({
                type:"error",
                icon:<Icon icon={"material-symbols:cancel-rounded"} className={"anticon"} />,
                content:message,
                key:"login"
            })
            return
        }
        userStore.state.token = res.data.token
        messageApi.open({
            type:"loading",
            content:"正在验证用户信息",
            duration:0,
            key:"login"
        })
        await delay(1000)
        const res2 = await userStore.action.profile()
        if (res2.code === ResCode.success){
            messageApi.destroy("login")
            showLoginNotification(notification,res2.data)
            history.replace("/")
            return
        }
        messageApi.open({
            type:"error",
            icon:<Icon icon={"material-symbols:cancel-rounded"} className={"anticon"} />,
            content:res2.message,
            key:"login"
        })
        return

    }
    const {runAsync:runLogin,loading:loginLoading}=useRequest(handleLogin,{manual:true})
    useEffect(()=>{
        let timer
        if (failedCount === 2){
            timer = setTimeout(()=>{
                setFailedCount(0)
                clearTimeout(timer)
            },2000)
        }
        return ()=>{
            if (timer){
                clearTimeout(timer)
            }
        }
    },[failedCount])
    return {
        loading:loginLoading,
        run:runLogin
    }
}
export default useLogin
