import {Conversation, ConversationMode} from "@/types/message/Conversation";
import {create} from "zustand";
import {devtools, subscribeWithSelector} from "zustand/middleware";
import {createSelectors} from "@/types/WithSelectors";
import {Message, MessageData, MessageType} from "@/types/message/Message";
import {getMessages, sendOneToOneMsg} from "@/services/api/message";
import {ResCode} from "@/types/APIResponseType";
import {User} from "@/types/User";
import {queryFriendInfo} from "@/services/api/user";
import {IDomEditor} from "@wangeditor/editor";
// @ts-ignore
import computed from "zustand-computed"
import {useDBStore} from "@/stores/databaseStore";
import {MessageCache} from "@/types/message/MessageCache";
type MessageStoreType = {
    orgConversations:Conversation[], //原始的所有的聊天列表
    conversations:Conversation[], //经过筛选的左侧正在聊天的列表
    mode:ConversationMode,//当前的选择的类型
    fid:number|null, //当前正在聊天的好友的id
    friendInfo:User|null,//当前好友的信息
    groupId:number|null, //当前正在聊天的group的id
    msgData:MessageData|null,//聊天消息的数据
}
type ComputedStore = {
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
        currentTime:string
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
    msgData:null
}
const computedState=(state:MessageStoreType & Action):ComputedStore=>{
    return {}
}
const useMessageStoreBase = create(
    computed(
        subscribeWithSelector<MessageStoreType & Action>(
            (set,get)=>({
                ...initialState,
                sendOneToOneMsg:async (params)=>{
                    const res =await sendOneToOneMsg(params)
                    if (res.code === ResCode.success){
                        set({
                            msgData:{
                                ...get().msgData,
                                messages:get().msgData.messages.concat()
                            }
                        })
                        const {database}=useDBStore.getState()
                        const messagesCache =await database.get<MessageData>("user-chat",`${params.fid}-message`)

                    }
                },
                initMessage:async (params)=>{
                    const {database}=useDBStore.getState()
                    const messagesCache =await database.get<MessageData>("user-chat",`${params.fid}-message`)
                    if(!messagesCache){
                        //没有缓存，就初始化数据
                        const res = await getMessages(params)
                        if (res.code === ResCode.success){
                            const msgData:MessageData = {
                                currentTime:params.currentTime,
                                total: res.data.total,
                                totalPage: res.data.pageTotal,
                                page:params.page,
                                pageSize:params.pageSize,
                                messages:res.data.data
                            }
                            database.set<MessageData>("user-chat",`${params.fid}-message`,msgData)
                            set({msgData:msgData})
                        }
                        return
                    }
                    set({msgData:messagesCache})

                },
                clear:()=>{
                    set(()=>initialState,true)
                }
            }),
        ),
        computedState
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
