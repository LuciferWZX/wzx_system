import {APIResponseType} from "@/types/APIResponseType";
import request from "@/services/request";
import {ContactUser} from "@/types/User";
import {ContactGroup} from "@/types/ContactGroup";

/**
 * 获取该用户及系统的分组
 * @param params
 */
export const sendFriendsRequest = async (params:{
    fid:number
    uGroupId:number
    senderRemark:string
    senderDesc:string
}):Promise<APIResponseType<ContactGroup[]>> =>{
    const url = `/api/v1/friends`
    return request(url,{
        method:"POST",
        data:params
    })
}
export const getContactRecords = async ():Promise<APIResponseType<any[]>> =>{
    const url = `/api/v1/friends`
    return request(url,{
        method:"GET",
    })
}
