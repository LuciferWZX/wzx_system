import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import {useLayoutEffect} from "react";

const useGetFriendInfo = () => {
    const fid=useMessageStore(state => state.fid,shallow)
    useLayoutEffect(()=>{
        if (fid){

        }
    },[fid])
}
