import React, {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {message} from "antd";
import {login} from "@/services/api/auth";
import {ResCode} from "@/types/APIResponseType";
import {Icon} from "umi";
import userStore from "@/stores/user.store";

const useLogin = () => {
    const [failedCount, setFailedCount] = useState<number>(0);
    const [messageApi, contextHolder] = message.useMessage();
    const handleLogin=async (params:{type:"password"|"verifyCode",way:string,value:string})=>{
        if (failedCount === 3){
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
        const res = await login(params)
        if (res.code !== ResCode.success){
            setFailedCount(failedCount+1)
            messageApi.open({
                type:"error",
                icon:<Icon icon={"material-symbols:cancel-rounded"} className={"anticon"} />,
                content:res.message,
                key:"login"
            })
            return
        }
        userStore.state.token = res.data.token


    }
    const {runAsync:runLogin,loading:loginLoading}=useRequest(handleLogin,{manual:true})
    useEffect(()=>{
        let timer
        if (failedCount === 3){
            timer = setTimeout(()=>{
                setFailedCount(0)
                clearTimeout(timer)
            },30000)
        }
        return ()=>{
            if (timer){
                clearTimeout(timer)
            }
        }
    },[failedCount])
    return {
        message:messageApi,
        contextHolder,
        loading:loginLoading,
        run:runLogin
    }
}
export default useLogin
