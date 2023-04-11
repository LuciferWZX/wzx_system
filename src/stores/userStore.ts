import {create,} from "zustand";
import {User} from "@/types/User";
import {ReadyState} from "@/types/Socket";
import {APIResponseType} from "@/types/APIResponseType";
import {profile} from "@/services/api/auth";
import {devtools, subscribeWithSelector} from "zustand/middleware";
import {Socket} from "socket.io-client";
import {delay} from "@/utils/delay";
import store from "storejs";
import {StoreKey} from "@/types/StoreKey";

export type UserStoreProps = {
    user:User|null,
    token:string
    readyState:ReadyState
    websocket:Socket|null
}
type Actions = {
    profile:()=>Promise<APIResponseType<User|null>>
    switchProfile:(token:string)=>Promise<APIResponseType<User|null>>
    // login:(params:{type:"password"|"verifyCode",way:string,value:string})=>Promise<void>
    clear:()=>void
}

const initState:UserStoreProps = {
    user:null,
    token:"",
    readyState:ReadyState.Closed,
    websocket:null
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
        clear:()=>{
            set({
                token:"",
                user:null
            })
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
// const unsub2 = useUserStore.subscribe((state) => state.token,()=>{
//     console.log(1111)
// })

