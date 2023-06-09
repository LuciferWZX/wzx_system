import {create,} from "zustand";
import {RecordStatus, User} from "@/types/User";
import {ReadyState} from "@/types/Socket";
import {APIResponseType, ResCode} from "@/types/APIResponseType";
import {profile} from "@/services/api/auth";
import {subscribeWithSelector} from "zustand/middleware";
import {Socket} from "socket.io-client";
import {delay} from "@/utils/delay";
import store from "storejs";
import {StoreKey} from "@/types/StoreKey";
import {ContactGroup} from "@/types/ContactGroup";
import {getContactGroups} from "@/services/api/user";
import {getContactRecords, getContacts, sendFriendsRequest} from "@/services/api/friends";
import {message} from "antd";
import {useContactStore} from "@/stores/contactStore";
import {RequestRecord} from "@/types/friends/RequestRecord";
import {Contact} from "@/types/friends/Contact";

export type UserStoreProps = {
    user:User|null,
    token:string
    readyState:ReadyState
    websocket:Socket|null
    contactGroups:ContactGroup[]
    requestRecords:RequestRecord[]
    contacts:Contact[]
}
type Actions = {
    profile:()=>Promise<APIResponseType<User|null>>
    getContactGroups:()=>Promise<APIResponseType<ContactGroup[]>>
    switchProfile:(token:string)=>Promise<APIResponseType<User|null>>
    sendFriendsRequest:(params:{
        fid:number
        uGroupId:number
        senderRemark:string
        senderDesc:string
    })=>Promise<any>
    getContactRecords:()=>Promise<any>
    getContacts:()=>Promise<any>
    // login:(params:{type:"password"|"verifyCode",way:string,value:string})=>Promise<void>
    clear:()=>void
}

const initState:UserStoreProps = {
    user:null,
    token:"",
    readyState:ReadyState.Closed,
    websocket:null,
    contacts:[],
    contactGroups:[],
    requestRecords:[]
}
export const useUserStore = create(subscribeWithSelector<UserStoreProps & Actions>((set,get)=>{
    return {
        ...initState,
        profile:async ()=>{
            const res = await profile()
            if (res.data){
                set({user:res.data})
            }
            return res
        },
        switchProfile:async (token:string)=>{
            await delay(1000)
            const res = await profile(token)
            if (res.data){
                set({
                    token,
                    user:res.data
                })
            }
            return res
        },
        getContactGroups:async ()=>{
            const res = await getContactGroups()
            if (res.code === ResCode.success){
                set({
                    contactGroups:res.data
                })
            }
            return res
        },
        getContactRecords:async ()=>{
            const res = await getContactRecords()
            if (res.code === ResCode.success){
                set({
                    requestRecords:res.data
                })
            }
            return res
        },
        sendFriendsRequest:async (params)=>{
            const res = await sendFriendsRequest(params)
            if (res.code === ResCode.success){
                //刷新记录列表
                await get().getContactRecords()
            }
            return res
        },
        getContacts:async ()=>{
            const res = await getContacts();
            if (res.code === ResCode.success){
                set({
                    contacts:res.data
                })
            }
        },
        clear:()=>{
            set({
                token:"",
                user:null,
                contactGroups:[],
                requestRecords:[]
            })
            message.destroy()
        }
    }
}))
useUserStore.subscribe(state => state.token,(token) => {
    if (token){
        store.set(StoreKey.Auth,token)
        return
    }
    store.remove(StoreKey.Auth)
})
useUserStore.subscribe(state=>state.user,(user)=>{
    if (user){
        const mapJsonStr = store.get(StoreKey.Accounts)
        let accounts:Map<number,{id:number,avatar:string,nickname:string,token:string}>
        if (mapJsonStr) {
            accounts = new Map(JSON.parse(mapJsonStr))
        }else{
            accounts = new Map()
        }
        accounts.set(user.id,{id:user.id,avatar:user.avatar,nickname:user.nickname,token:useUserStore.getState().token})
        store.set(StoreKey.Accounts,JSON.stringify([...accounts]))
        store.set(StoreKey.CurrentUserId,user.id)
        return
    }
})

useUserStore.subscribe(state => state.requestRecords,(requestRecords)=>{
    const unHandleRecords= requestRecords.filter(record=>record.creatorId === record.fid && record.status===RecordStatus.Waiting)
    useContactStore.setState({
        unHandleRequestNum:unHandleRecords.length
    })
})

