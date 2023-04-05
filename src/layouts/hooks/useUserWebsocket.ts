import {Socket} from "socket.io-client";
import {useLayoutEffect} from "react";
import {useSnapshot} from "umi";
import userStore from "@/stores/user.store";
import {SocketChannel} from "@/types/SocketChannel";
import {MsgDataType, MsgType} from "@/types/MsgType";
type MessagePayloadType={
    fid:number,
    msgType:MsgType
    data:MsgDataType
}
const useUserWebsocket = (socket:Socket) => {
    const {user}=useSnapshot(userStore.state)
    useLayoutEffect(()=>{
        if (socket && user?.id){
            //【聊天模块】【我对1 ， 我对多】监听自己获得的（消息）
            socket.on(`${SocketChannel.Message}-${user.id}`,(payload:string)=>{
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
            })
        }
    },[user?.id,socket])
}
export default useUserWebsocket
