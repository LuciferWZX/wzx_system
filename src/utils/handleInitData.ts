import {useUserStore} from "@/stores";
import {updateConversations} from "@/utils/handleConversations";

export const handleInitData=async ()=>{
    console.log("[初始化用户必要数据]")
    const {getState:getUserState}=useUserStore
    await Promise.all([
        getUserState().getContactGroups(), //获取组列表
        getUserState().getContactRecords(),//获取新朋友列表
        getUserState().getContacts(),//获取联系人列表
    ])
    await updateConversations() //同步当前conversation列表
}
