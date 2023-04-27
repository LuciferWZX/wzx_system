import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import {useLayoutEffect} from "react";
import {useRequest} from "ahooks";
import {MessageData} from "@/types/message/Message";
import dayjs from "dayjs";

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
        const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
        await queryMessageData({
            fid,
            page:curMessageData.page,
            pageSize:curMessageData.pageSize,
            currentTime
        })
    }
    return {
        curMessageData
    }
}
export default useGetMessage
