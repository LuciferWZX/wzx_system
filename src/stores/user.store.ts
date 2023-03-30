import {proxyWithComputed} from "umi";
import {login} from "@/services/api/auth";

type UserStoreProps = {
    user:any,
    token:string
}
type UserComputedProps = {

}
type Actions = {
    profile:()=>Promise<void>
    login:(params:{type:"password"|"verifyCode",way:string,value:string})=>Promise<void>
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

    }
}

export default {
    state,
    action
}
