import {useContactStore, useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {useLayoutEffect, useState} from "react";
import {ContactUser} from "@/types/User";
import {RequestRecord} from "@/types/friends/RequestRecord";

export const useRequestRecord = () => {
    const [record, setRecord] = useState<RequestRecord|null>(null);
    const [recordUser, setRecordUser] = useState<ContactUser|null>(null);
    const {id}=useContactStore(state => ({id:state.selectId}),shallow)
    const {requestRecords,uId}=useUserStore(state => ({
        requestRecords:state.requestRecords,
        uId:state.user?.id
    }),shallow)
    useLayoutEffect(()=>{
        const curRecord = requestRecords.find(_record=>_record.id === id)
        setRecordUser(curRecord?.friendInfo ?? null)
        setRecord(curRecord ?? null)
    },[id,requestRecords])
    return {
        record,
        recordUser
    }
}
