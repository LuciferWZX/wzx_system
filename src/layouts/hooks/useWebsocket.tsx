import {useLayoutEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {SocketChannel} from "@/types/SocketChannel";
import {MsgType} from "@/types/MsgType";
import {MessagePayloadType, ReadyState} from "@/types/Socket";
import {MessageInstance} from "antd/es/message/interface";
import {Typography} from 'antd'
import {LoadingOutlined} from "@ant-design/icons";
import {useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {RequestRecord} from "@/types/User";
const {Text}=Typography
const useWebsocket = (message:MessageInstance) => {
    const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);
    const {token,user,websocket} = useUserStore(state => ({
        token:state.token,
        user:state.user,
        websocket:state.websocket,
    }),shallow)
    useLayoutEffect(()=>{
        if (user?.id){
            //id更变了,socket存在，先清除
            clearSocket()
            //然后初始化socket
            initSocket()
        }else{
            clearSocket()
        }
    },[user?.id])
    useLayoutEffect(()=>{
        if (websocket){
            //监听socket事件
            listenEvents()
        }
    },[websocket])
    //同步连接状态到store
    useLayoutEffect(()=>{
        useUserStore.setState({
            readyState
        })
        if (readyState === ReadyState.Connecting && user){
            message.error({
                content:<Text strong={true} style={{color:"red"}}>正在进行连接...</Text>,
                icon:<LoadingOutlined/>,
                key:"connect_error",
                duration:null
            })
        }else {
            message.destroy("connect_error")
        }
    },[readyState])
    /**
     * 清除socket,卸载事件
     */
    const clearSocket=()=>{
        if (websocket){
            console.log("[清除Socket]")
            websocket.disconnect()
            websocket.close()
            websocket.removeAllListeners()
            useUserStore.setState({websocket:null})
        }
    }
    /**
     * 初始化socket事件
     */
    const initSocket=()=>{
        console.log("[初始化Socket]")
        const SOCKET_URL =require("../../../config/config.json").socket.url
        const socket = io(SOCKET_URL,{
            transports:["websocket", "polling"],
            auth:{
                token:token
            }
        })
        useUserStore.setState({websocket:socket})
    }
    const listenEvents=()=>{
        if (websocket){
            console.log("[socket事件监听]")
            socketEvents(websocket)
            userEvents(websocket)
        }
    }
    /**
     * socket原生事件
     */
    const socketEvents=(socket:Socket)=>{
        socket.on("connect",()=>{
            console.log("[socket已连接]:",socket.id)
            setReadyState(ReadyState.Open)
        })
        socket.on("disconnect",()=>{
            console.log("[socket已断开连接]")
            setReadyState(ReadyState.Closed)
        })
        socket.on("error", (err) => {
            console.log("错误-error", err);
            setReadyState(ReadyState.Closed)
        })
        socket.on("connect_error", (err) => {
            console.log("[连接错误]:",err.message);
            setReadyState(ReadyState.Connecting)
        });
        socket.on("connect_timeout", (data) => {
            console.log("[连接超时]:", data);
            setReadyState(ReadyState.Closed)
        });
        socket.on("reconnect", (attemptNumber) => {
            // 重连尝试次数
            console.log("重连成功-reconnect", attemptNumber)
        });
        socket.on("reconnect_attempt", (attemptNumber) => {
            // 重连尝试次数
            console.log("尝试重连-reconnect_attempt", attemptNumber)
        });
        socket.on("reconnecting", (attemptNumber) => {
            // 重连尝试次数
            console.log("正在尝试重连-reconnecting", attemptNumber)
            setReadyState(ReadyState.Connecting)
        });
        socket.on("reconnect_error", (err) => {
            setReadyState(ReadyState.Closed)
            console.log("重连尝试错误-reconnect_error");
        });
        // 客户端不能重连时触发
        socket.on("reconnect_failed", () => {
            setReadyState(ReadyState.Closed)
            console.log("客户端不能连接-reconnect_failed")
        });
    }
    /**
     * 用户事件
     */
    const userEvents=(socket:Socket)=>{
        if (user){
            socket.on(`${SocketChannel.Message}-${user.id}`,receiveMsg)
            socket.on(`update-friends-records`,updateContactRecords)
        }
    }
    const receiveMsg=(payload:string)=>{
        try {
            const {fid,msgType,data}=JSON.parse(payload) as MessagePayloadType
            switch (msgType) {
                case MsgType.Text:{
                    return "Text"
                }
                case MsgType.image:{
                    return "Image"
                }
                case MsgType.video:{
                    return "Video"
                }
                case MsgType.file:{
                    return "File"
                }
                default:{
                    throw Error("[未知消息类型]")
                }
            }
        }catch (e){
            console.error(`${SocketChannel.Message}-${user.id} 出错`,e)
        }
    }
    const updateContactRecords=async (payload:RequestRecord)=>{
        console.log("[接受到好友请求的消息:]",payload)
        //存在就替换，不存在就添加到最前面
        const {requestRecords}=useUserStore.getState()
        const isExist = requestRecords.some(_record=>_record.id === payload.id)
        if (isExist){
            useUserStore.setState({
                requestRecords:requestRecords.map(_record=>{
                    if (_record.id === payload.id){
                        return payload
                    }
                    return _record
                })
            })
            return
        }
        useUserStore.setState({
            requestRecords:[payload].concat(...requestRecords)
        })
    }
}
export default useWebsocket
