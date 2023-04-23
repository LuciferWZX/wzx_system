import {APIResponseType} from "@/types/APIResponseType";
import {ContactGroup} from "@/types/ContactGroup";
import request from "@/services/request";
import {Message, MessageType} from "@/types/message/Message";

export const sendOneToOneMsg = async (data: {
    fid: number;
    reminder: boolean;
    type: MessageType;
    content:string;
}):Promise<APIResponseType<Message>> =>{
    const url = `/api/v1/message`
    return request(url,{
        method:"POST",
        data:data
    })
}
export const getMessages = async (params: {
    fid: number;
    pageSize: number;
    page: number;
}):Promise<APIResponseType<{
    total:number, //总数
    pageTotal: number,//页码总数
    data: Message[],
}>> =>{
    const url = `/api/v1/message`
    return request(url,{
        method:"get",
        params:params
    })
}
