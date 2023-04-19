import {Conversation, ConversationMode} from "@/types/message/Conversation";
import {create} from "zustand";
import {devtools, subscribeWithSelector} from "zustand/middleware";
import {createSelectors} from "@/types/WithSelectors";

type MessageStoreType = {
    orgConversations:Conversation[], //原始的所有的聊天列表
    conversations:Conversation[], //经过筛选的左侧正在聊天的列表
    mode:ConversationMode,//当前的选择的类型
    fid:number|null, //当前正在聊天的好友的id
    groupId:number|null, //当前正在聊天的group的id
}
type Action = {
    clear:()=>void
}
const initialState:MessageStoreType = {
    orgConversations:[],
    conversations:[],
    mode:ConversationMode.all,
    fid:null,
    groupId:null,
}
const useMessageStoreBase = create(
    subscribeWithSelector(
        devtools<MessageStoreType & Action>(
            (set,get)=>({
                ...initialState,
                clear:()=>{
                    set(()=>initialState,true)
                }
            }),{
                name:"message"
            }
        )
    )
)
export const useMessageStore = createSelectors(useMessageStoreBase)
