import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";
import {ContactUser} from "@/types/User";
type ContactStoreType = {
    filterStr:string //过滤的字符串
    addContactVisible:boolean //添加好友的modal
    addFriendsDetailVisible:boolean //添加好友时查看好友简介的modal
    curUserDetail:ContactUser|null //添加好友时候查看该好友的简介
    unHandleRequestNum:number // 未处理的新朋友的数量
    selectType:"request"|"contact"|null //通讯录左侧选择类型
    selectId:number|null //通讯录左侧选择的item的id
}
type Action = {

}
const initState:ContactStoreType = {
    filterStr:"",
    addContactVisible:false,
    addFriendsDetailVisible:false,
    curUserDetail:null,
    unHandleRequestNum:0,
    selectType:null,
    selectId:null
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
