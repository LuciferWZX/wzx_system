import {useLayoutEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useSnapshot} from "umi";
import userStore from "@/stores/user.store";
import {useLatest} from "ahooks";


const useWebsocket = () => {
    const [websocket, setWebsocket] = useState<Socket|null>(null);
    const websocketRef = useLatest(websocket);
    const {token} = useSnapshot(userStore.state)
    useLayoutEffect(()=>{
        console.log("token:",token)
        if (token){
            const SOCKET_URL ="http://localhost:8000/dm"
            const socket = io(SOCKET_URL,{
                transports:["websocket", "polling"],
                auth:{
                    token:token
                }
            })
            socket.on("connect",()=>{
                console.log("[socket已连接]:",socket)
                setWebsocket(null)
                setWebsocket(socket)
            })
            socket.on("connecting",()=>{
                console.log("[socket正在连接]:",socket.id)
            })
            socket.on("connect_failed",()=>{
                console.log("[socket连接失败]:",socket.id)
            })
            socket.on("reconnect",()=>{
                console.log("[socket已成功重连]:",socket.id)
            })
            socket.on("reconnecting",()=>{
                console.log("[socket正在重连]:",socket.id)
            })
            socket.on("reconnect_failed",()=>{
                console.log("[socket重连失败]:",socket.id)
            })
            socket.on("disconnect",()=>{
                console.log("[socket已断开连接]")
                setWebsocket(socket)
            })
            setWebsocket(socket)
        }else{
            if (websocket){
                websocket.disconnect()
                websocket.close()
                setWebsocket(null)
            }
        }
    },[token])
    return {
        socket:websocketRef.current
    }
}
export default useWebsocket
