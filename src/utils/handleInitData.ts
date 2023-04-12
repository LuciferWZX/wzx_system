import {useUserStore} from "@/stores";

export const handleInitData=async ()=>{
    console.log("[初始化用户必要数据]")
    const {getState:getUserState}=useUserStore
    await Promise.all([
        getUserState().getContactGroups(),
        getUserState().getContactRecords(),
    ])
}