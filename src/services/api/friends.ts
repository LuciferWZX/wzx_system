import {APIResponseType} from "@/types/APIResponseType";
import request from "@/services/request";
import {ContactGroup} from "@/types/ContactGroup";
import {RequestRecord} from "@/types/friends/RequestRecord";
import {RecordStatus} from "@/types/User";
import {Contact} from "@/types/friends/Contact";

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
export const getContactRecords = async ():Promise<APIResponseType<RequestRecord[]>> =>{
    const url = `/api/v1/friends`
    return request(url,{
        method:"GET",
    })
}

export const getContacts = async ():Promise<APIResponseType<Contact[]>> =>{
    const url = `/api/v1/friends/contacts`
    return request(url,{
        method:"GET",
    })
}
/**
 * 同意或者拒绝
 * @param data
 */
export const changeContactRecordsStatus = async (data:{
    groupId: number;
    recordId: number;
    status: RecordStatus.Accept | RecordStatus.Reject;
    rejectReason?: string;
}):Promise<APIResponseType<{ id:string }>> =>{
    const url = `/api/v1/friends/change_record_status`
    return request(url,{
        method:"POST",
        data
    })
}
