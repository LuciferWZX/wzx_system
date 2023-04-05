import {proxyWithComputed,subscribeKey} from "umi";
import {login, profile} from "@/services/api/auth";
import {User} from "@/types/User";
import {APIResponseType} from "@/types/APIResponseType";
import store from "storejs"
import {StoreKey} from "@/types/StoreKey";
import {delay} from "@/utils/delay";

type UserStoreProps = {
    user:User,
    token:string
}
type UserComputedProps = {

}
type Actions = {
    profile:()=>Promise<APIResponseType<User|null>>
    switchProfile:(token:string)=>Promise<APIResponseType<User|null>>
    login:(params:{type:"password"|"verifyCode",way:string,value:string})=>Promise<void>
    clear:()=>void
}
const initState:UserStoreProps = {
    user:null,
    token:""
}
const state:UserStoreProps & UserComputedProps=proxyWithComputed<UserStoreProps,UserComputedProps>(initState,{

})
const action:Actions = {
    login:async (params)=>{
        const data =await login(params)
        console.log("data",data)
    },
    profile:async ()=>{
        const res = await profile()
        if (res.data){
            state.user = res.data
        }
        return res
    },
    switchProfile:async (token:string)=>{
        await delay(1000)
        const res = await profile(token)
        if (res.data){
            state.token=token
            state.user = res.data
        }
        return res
    },
    clear:async ()=>{
        state.user = initState.user
        state.token = initState.token
    }
}
/**
 * 订阅token
 */
subscribeKey(state,"token",(token:string)=>{
    if (token){
        store.set(StoreKey.Auth,token)
        return
    }
    store.remove(StoreKey.Auth)
})
/**
 * 订阅user字段
 */
subscribeKey(state,"user",(user:User|null)=>{
    if (user){
        const mapJsonStr = store.get(StoreKey.Accounts)
        let accounts:Map<number,{id:number,avatar:string,nickname:string,token:string}>
        if (mapJsonStr) {
            accounts = new Map(JSON.parse(mapJsonStr))
        }else{
            accounts = new Map()
        }
        accounts.set(user.id,{id:user.id,avatar:user.avatar,nickname:user.nickname,token:state.token})
        store.set(StoreKey.Accounts,JSON.stringify([...accounts]))
        store.set(StoreKey.CurrentUserId,user.id)
        return
    }
})

export default {
    state,
    action
}
