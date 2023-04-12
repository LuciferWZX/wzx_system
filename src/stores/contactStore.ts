import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";
type ContactStoreType = {
    filterStr:string //过滤的字符串
    addContactVisible:boolean //添加好友的modal
}
type Action = {

}
const initState:ContactStoreType = {
    filterStr:"",
    addContactVisible:false
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
