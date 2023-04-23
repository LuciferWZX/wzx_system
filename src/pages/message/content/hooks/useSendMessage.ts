import {useRequest} from "ahooks";
import {useMessageStore} from "@/stores/messageStore";
import {MessageType} from "@/types/message/Message";

type SendMessageConfig = {
    type:"user"|"group"
}
const useSendMessage=(config:SendMessageConfig)=>{
    const sendMessage=async (params:{
        fid: number;
        reminder: boolean;
        type: MessageType;
        content:string;
    })=>{
        if (config.type === "user"){
            return useMessageStore.getState().sendOneToOneMsg(params)
        }
    }

    const {runAsync:sendMsg,loading:loading}=useRequest(sendMessage,{
        manual:true
    })
    return {
        sendMsg,
        loading
    }
}
export default useSendMessage
