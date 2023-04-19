import {FC} from "react";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import {theme} from 'antd'
import {styled} from "umi";
import HeaderBar from "@/pages/message/slider/HeaderBar";
import {MacScrollbar} from "mac-scrollbar";
import ConversationItem from "@/pages/message/slider/ConversationItem";
const {useToken}=theme
const MessageSlider:FC = () => {
    const {token:{colorBgContainer,colorBorder}}=useToken()
    const conversations = useMessageStore(state => state.conversations,shallow)
    console.log(111,conversations)
    return(
        <StyledMessageSlider style={{backgroundColor:colorBgContainer}}>
            <HeaderBar/>
            <StyledConversations>
                {conversations.map(conversation=>{
                    return(
                        <ConversationItem className={'conversation-item'} conversation={conversation} key={conversation.fid}/>
                    )
                })}
            </StyledConversations>
        </StyledMessageSlider>
    )
}
const StyledMessageSlider = styled.div`\
  height: 100%;
  display: flex;
  flex-direction: column;
`
const StyledConversations = styled(MacScrollbar)`
  padding: 0 5px;
  flex: 1;
  .conversation-item:not(:first-child){
    margin-top: 5px;
  }
`
export default MessageSlider
