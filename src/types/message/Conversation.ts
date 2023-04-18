import {User} from "@/types/User";

export type Conversation = {
    fid:number //当前好友的id
    friendInfo:User //当前好友的一些信息
    unRead:number //未读消息个数
    noDisturb?:boolean //免打扰
}
export enum ConversationMode {
    all="all", //全部
    unRead="unRead",//未读
    atMe="atMe",//@我
    group="group",//群组
    care="care",//我关心
}
