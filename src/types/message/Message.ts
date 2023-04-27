export enum MessageType {
    text = 'text', //文字
    image = 'image', //图片
    video = 'video', //视频
    file = 'file', //文件
}
export type Message = {
    content:string
    createDate:string
    deletedDate:null|string
    id:number
    messageType:MessageType
    read:boolean
    receiverDeleted:boolean
    receiverId:number
    senderDeleted:boolean
    senderId:number
    updateDate:string
}
export type MessageData = {
    currentTime?:string
    page:number
    pageSize:number
    total:number
    totalPage:number
    messages:Message[]
}
