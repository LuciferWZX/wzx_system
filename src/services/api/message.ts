import {APIResponseType} from "@/types/APIResponseType";
import {ContactGroup} from "@/types/ContactGroup";
import request from "@/services/request";
import {MessageType} from "@/types/message/Messaget";

export const sendOneToOneMsg = async (params: {
    fid: number;
    reminder: boolean;
    type: MessageType;
    content:string;
}):Promise<APIResponseType<any>> =>{
    const url = `/api/v1/message`
    return request(url,{
        method:"POST",
        data:params
    })
}
