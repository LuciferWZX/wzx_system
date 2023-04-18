import {useContactStore, useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {useLayoutEffect, useState} from "react";
import {User} from "@/types/User";


const useContact = () => {
    const [curFriendInfo, setFriendInfo] = useState<User|null>(null);
    const {contacts,uId}=useUserStore(state => ({
        contacts:state.contacts,
        uId:state.user?.id
    }),shallow)
    const {selectedId}=useContactStore(state =>({
        selectedId:state.selectId
    }),shallow)
    useLayoutEffect(()=>{
        if (selectedId){
            setFriendInfo(contacts.find(_contact=>_contact.id === selectedId)?.friendInfo ?? null)
        }
    },[selectedId,contacts])

    return {
        friendInfo:curFriendInfo
    }
}
export default useContact
