import {Conversation, ConversationMode} from "@/types/message/Conversation";
import {create} from "zustand";
import {devtools, subscribeWithSelector} from "zustand/middleware";
import {createSelectors} from "@/types/WithSelectors";
import {MessageData, MessageType} from "@/types/message/Message";
import {getMessages, sendOneToOneMsg} from "@/services/api/message";
import {ResCode} from "@/types/APIResponseType";
import {User} from "@/types/User";
import {queryFriendInfo} from "@/services/api/user";
import {IDomEditor} from "@wangeditor/editor";
// @ts-ignore
import computed from "zustand-computed"
type MessageStoreType = {
    orgConversations:Conversation[], //原始的所有的聊天列表
    conversations:Conversation[], //经过筛选的左侧正在聊天的列表
    mode:ConversationMode,//当前的选择的类型
    fid:number|null, //当前正在聊天的好友的id
    friendInfo:User|null,//当前好友的信息
    groupId:number|null, //当前正在聊天的group的id
    msgMap:Map<number,MessageData>,//聊天消息map
    inputEditor:null|IDomEditor
}
type ComputedStore = {
    currentMessageData: MessageData
}
type Action = {
    sendOneToOneMsg:(params: {
        fid: number;
        reminder: boolean;
        type: MessageType;
        content:string;
    })=>Promise<void>
    initMessage:(params: {
        fid: number;
        pageSize: number;
        page: number;
    })=>Promise<void>
    clear:()=>void
}
const initialState:MessageStoreType = {
    orgConversations:[],
    conversations:[],
    mode:ConversationMode.all,
    fid:null,
    friendInfo:null,
    groupId:null,
    inputEditor:null,
    msgMap:new Map()
}
const computedState=(state:MessageStoreType & Action):ComputedStore=>{
    const emptyValue:MessageData = {
        total: 0,
        totalPage: 1,
        page:1,
        pageSize:20,
        messages:[]
    }
    return {
        currentMessageData:state.msgMap.get(state.fid) ??emptyValue
    }
}
const useMessageStoreBase = create(
    subscribeWithSelector<MessageStoreType & Action &ComputedStore>(
        computed(
            (set,get)=>({
                ...initialState,
                sendOneToOneMsg:async (params)=>{
                    const res =await sendOneToOneMsg(params)
                    if (res.code === ResCode.success){
                        const emptyValue:MessageData = {
                            total: 1,
                            totalPage: 1,
                            page:1,
                            pageSize:20,
                            messages:[]
                        }
                        const {msgMap}=get()
                        const msgList = msgMap.get(params.fid)||emptyValue
                        msgList.messages.push(res.data)
                        msgMap.set(params.fid,msgList)
                        set({
                            msgMap
                        })
                    }
                },
                initMessage:async (params)=>{
                    const res = await getMessages(params)
                    if (res.code === ResCode.success){
                        const emptyValue:MessageData = {
                            page:1,
                            pageSize:20,
                            messages:[],
                            total:0,
                            totalPage:1
                        }
                        const {msgMap} = get()
                        const msgList =msgMap.get(params.fid)||emptyValue
                        msgList.page = params.page
                        msgList.pageSize = params.pageSize
                        msgList.total = res.data.total
                        msgList.totalPage = res.data.pageTotal
                        msgList.messages = res.data.data
                        msgMap.set(params.fid,msgList)
                        set({
                            msgMap
                        })
                    }
                },
                clear:()=>{
                    set(()=>initialState,true)
                }
            }),
            computedState
        )

    ),
)
useMessageStoreBase.subscribe(state => state.fid,async (fid)=>{
    if (fid){
        const res = await queryFriendInfo({fid})
        if (res.code === ResCode.success){
            useMessageStoreBase.setState({friendInfo:res.data})
        }
    }
})
export const useMessageStore = createSelectors(useMessageStoreBase)
