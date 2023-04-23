import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import {useLayoutEffect} from "react";
import {useRequest} from "ahooks";
import {MessageData} from "@/types/message/Message";

const useGetMessage = () => {
    const fid = useMessageStore(state => state.fid,shallow)
    const curMessageData = useMessageStore.use.currentMessageData()
    console.log(["999999"],curMessageData)
    const {runAsync:queryMessageData,loading}=useRequest(useMessageStore.getState().initMessage,{
        manual:true
    })
    useLayoutEffect(()=>{
        if (fid){
            initMessageData()
        }
    },[fid])
    const initMessageData=async ()=>{
        await queryMessageData({
            fid,
            page:curMessageData.page,
            pageSize:curMessageData.pageSize
        })
    }
    return {
        curMessageData
    }
}
export default useGetMessage
