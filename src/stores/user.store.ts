import {proxyWithComputed,subscribeKey} from "umi";
import {login, profile} from "@/services/api/auth";
import {User} from "@/types/User";
import {APIResponseType} from "@/types/APIResponseType";
import store from "storejs"
import {StoreKey} from "@/types/StoreKey";

type UserStoreProps = {
    user:User,
    token:string
}
type UserComputedProps = {

}
type Actions = {
    profile:()=>Promise<APIResponseType<User|null>>
    login:(params:{type:"password"|"verifyCode",way:string,value:string})=>Promise<void>
}
const initState:UserStoreProps = {
    user:null,
    token:"",
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

export default {
    state,
    action
}
