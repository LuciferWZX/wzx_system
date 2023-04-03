import request from "@/services/request";
import {APIResponseType} from "@/types/APIResponseType";
import {User} from "@/types/User";

export const login = async (params:{type:"password"|"verifyCode",way:string,value:string}):Promise<APIResponseType<{id:string,token:string}&{failedCount:number}>> =>{
    const url = `/api/v1/auth/login`
    return request(url,{
        method:"POST",
        data:params
    })
}
export const profile = async (token?:string):Promise<APIResponseType<User>> =>{
    const url = `/api/v1/auth/profile`
    if (token){
        return request(url,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    }
    return request(url,{
        method:"GET",
    })
}
