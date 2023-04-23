import {FC} from "react";
import {styled} from "umi";
import FriendMessageList from "@/pages/message/content/FriendMessageList";
import MessageInput from "@/pages/message/content/MessageInput";
import {theme} from 'antd'
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
const {useToken}=theme
const FriendContent:FC = () => {
    const {token:{colorBgLayout}}=useToken()
    const friendInfo = useMessageStore(state => state.friendInfo,shallow)
    if (!friendInfo){
        return (
            <div>Loading</div>
        )
    }
    return(
        <StyledFriendMessageContent style={{backgroundColor:colorBgLayout}}>
            <FriendMessageList friendInfo={friendInfo} />
            <div className={'input-area'}>
                <MessageInput/>
            </div>
        </StyledFriendMessageContent>
    )
}
const StyledFriendMessageContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .input-area{
    padding-bottom: 10px;
  }
`
export default FriendContent
