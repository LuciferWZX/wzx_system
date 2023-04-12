export enum GenderType{
    female,
    male
}
export enum Authority {
    none,
    user,
    vip,
    admin,
}
export enum PlatformType {
    DM = 'dm', //本系统
    Wechat = 'wechat', //微信
    Google = 'google', //谷歌
    DingDing = 'dingDing', //钉钉
    FeiShu = 'feiShu', //飞书
    Github = 'github', //github
}


export interface User {
    id:          number;
    dm:          string;
    gender:      GenderType;
    nickname:    string;
    password:    string;
    firstName:   null|string;
    lastName:    null|string;
    username:    string;
    phonePrefix: null|string;
    phone:       null|string;
    avatar:      null|string;
    email:       null|string;
    createDate:  string;
    updateDate:  string;
    authority:   Authority;
    platform:    PlatformType;
}
export type ContactUser = {
    id:number,
    dm:string
    username:string
    nickname:string
    phone:null|string
    email:string
    avatar:string
    sign:null|string
    ban:BanType|null
}
export type BanType = {
    id:number
    uId:number
    createDate:string
    updateDate:string
    reason:string
    banded:boolean
    deleted:boolean
}
export enum DeletedStatus {
    Nothing = 'nothing', //两人都没删除这条记录
    UserDeleted = 'user_deleted', //发送者删除这条记录
    FriendDeleted = 'friend_deleted', //接收者删除这条记录
    BothDeleted = 'both_deleted', //两人都删除这条记录
}
export enum RecordStatus {
    Accept = 'accept', //接受
    Reject = 'reject', //拒绝
    Waiting = 'waiting', //等待处理
}
export type RequestRecord = {
    createDate:string
    deleted:DeletedStatus
    fid:number
    id:number
    rejectReason:null|string
    senderDesc:null|string
    senderRemark:string
    status:RecordStatus
    uGroupId:number
    uid:number
    updateDate:string
}
