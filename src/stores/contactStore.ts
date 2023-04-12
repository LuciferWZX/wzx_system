import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";
import {ContactUser} from "@/types/User";
type ContactStoreType = {
    filterStr:string //过滤的字符串
    addContactVisible:boolean //添加好友的modal
    addFriendsDetailVisible:boolean //添加好友时查看好友简介的modal
    curUserDetail:ContactUser|null
}
type Action = {

}
const initState:ContactStoreType = {
    filterStr:"",
    addContactVisible:false,
    addFriendsDetailVisible:false,
    curUserDetail:null
}
export const useContactStore = create(subscribeWithSelector<ContactStoreType & Action>((set)=>{
    return {
        ...initState
    }
}))
useContactStore.subscribe(state => state.filterStr,(filter)=>{
    if (filter){
        //存在过滤条件
    }
})
