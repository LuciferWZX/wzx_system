export enum MsgType {
    Text="text",
    image="image",
    file="file",
    video="video"
}
export type MsgDataType = {
    mId:number
    data:string //图片/视频/文件【地址】
    isDeleted:boolean
    createDate:string //创建时间
}
