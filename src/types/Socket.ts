import {MsgDataType, MsgType} from "@/types/MsgType";

export enum ReadyState {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3,
}
export type MessagePayloadType={
    fid:number,
    msgType:MsgType
    data:MsgDataType
}
