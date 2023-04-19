import {Conversation} from "@/types/message/Conversation";
import store from "storejs";
import {StoreKey} from "@/types/StoreKey";
import {useMessageStore} from "@/stores/messageStore";

export async function updateConversations(conversation?:Conversation){

    let conversations:Conversation[] = store.get(StoreKey.Conversations) ?? []
    if (!conversation){
        //没有传参就是将localstorage里面的数据同步到store里面
        useMessageStore.setState({orgConversations:conversations,conversations})
        return
    }
    if (!conversations.find(_cs=>_cs.fid === conversation.fid)){
        //没有就加入
        conversations = [conversation].concat(conversations)
    }else{
        //有就更新
        conversations = conversations.map(_cs=>{
            if (_cs.fid === conversation.fid){
                return conversation
            }
            return _cs
        })
    }
    useMessageStore.setState({orgConversations:conversations,conversations})
    store.set(StoreKey.Conversations,conversations)
}
