import {FC} from "react";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import FriendContent from "@/pages/message/content/FriendContent";
import {styled} from "umi";

const MessageContent:FC = () => {
    const {type}=useMessageStore(state => ({
        type:state.fid?"user":state.groupId?"group":"nothing"
    }),shallow)
    return(
        <StyledMessageContent>
            {type === "user"? <FriendContent/>:
                type==="group"?
                    <div>group</div>:
                    <div>loading</div>
            }
        </StyledMessageContent>
    )
}
const StyledMessageContent = styled.div`
    height: 100%;
`
export default MessageContent
