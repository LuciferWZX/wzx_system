import {APIResponseType} from "@/types/APIResponseType";
import request from "@/services/request";
import {ContactUser, User} from "@/types/User";
import {ContactGroup} from "@/types/ContactGroup";

let queryUsersController:AbortController
export const queryUsers = async (params:{queryStr:string}):Promise<APIResponseType<ContactUser[]>> =>{
    if (queryUsersController){
        queryUsersController.abort("清除上次请求")
    }
    queryUsersController = new AbortController()
    const { signal } = queryUsersController
    const url = `/api/v1/users/query`
    return request(url,{
        method:"POST",
        signal,
        data:params
    })
}
export const queryFriendInfo = async (params:{fid:number}):Promise<APIResponseType<User>> =>{
    const url = `/api/v1/users/friend-info`
    return request(url,{
        method:"GET",
        params:params
    })
}
/**
 * 获取该用户及系统的分组
 * @param params
 */
export const getContactGroups = async ():Promise<APIResponseType<ContactGroup[]>> =>{
    const url = `/api/v1/users/contact-groups`
    return request(url,{
        method:"GET",
    })
}
