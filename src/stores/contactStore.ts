import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";
import {ContactUser, RecordStatus} from "@/types/User";
import {changeContactRecordsStatus} from "@/services/api/friends";
import {ResCode} from "@/types/APIResponseType";
import {useUserStore} from "@/stores/userStore";

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
    changeRecordStatus:(params:{
        groupId: number;
        recordId: number;
        status: RecordStatus.Accept | RecordStatus.Reject;
        rejectReason?: string;
    })=>Promise<any>
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
        ...initState,
        changeRecordStatus:async (params)=>{
            const res = await changeContactRecordsStatus(params)
            if (res.code === ResCode.success){
                //成功了刷新数据【新朋友，好友列表】
                const {getContactRecords,getContacts}=useUserStore.getState()
                if (params.status === RecordStatus.Accept){
                    await Promise.all([
                        getContactRecords(), //新朋友列表
                        getContacts(),//联系人列表
                    ])
                }else{
                    await Promise.all([
                        getContactRecords(), //新朋友列表
                    ])
                }
            }
        }
    }
}))
useContactStore.subscribe(state => state.filterStr,(filter)=>{
    if (filter){
        //存在过滤条件
    }
})
