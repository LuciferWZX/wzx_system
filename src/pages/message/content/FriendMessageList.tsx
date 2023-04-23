import {FC} from "react";
import useGetMessage from "@/pages/message/content/hooks/useGetMessage";
import {MessageList} from "@/components";
import {User} from "@/types/User";
import {useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {styled} from "umi";
import {MacScrollbar} from "mac-scrollbar";
interface IProps{
    friendInfo:User
}
const FriendMessageList:FC<IProps> = (props) => {
    const {friendInfo}=props
    const user=useUserStore(state => state.user,shallow)
    const {curMessageData:data}=useGetMessage()

    return(
        <StyledList>
            <MessageList
                leftId={user.id}
                users={[friendInfo,user]}
                messages={data.messages}
            />
        </StyledList>
    )
}
const StyledList = styled(MacScrollbar)`
  flex: 1;
  padding: 0 10px;
  overflow: auto;
`
export default FriendMessageList
