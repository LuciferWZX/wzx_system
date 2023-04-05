import {useLayoutEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useSnapshot} from "umi";
import userStore from "@/stores/user.store";


const useWebsocket = () => {
    const [websocket, setWebsocket] = useState<Socket|null>(null);
    const {token} = useSnapshot(userStore.state)
    useLayoutEffect(()=>{
        console.log("token:",token)
        if (token){
            const SOCKET_URL ="http://localhost:8001/dm"
            const socket = io(SOCKET_URL,{
                transports:["websocket", "polling"],
                auth:{
                    token:token
                }
            })
            socket.on("connect",()=>{
                console.log("[socket已连接]:",socket.id)
            })
            socket.on("disconnect",()=>{
                console.log("[socket已断开连接]")
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
        socket:websocket
    }
}
export default useWebsocket
