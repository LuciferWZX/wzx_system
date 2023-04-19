import {FC} from "react";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import FriendContent from "@/pages/message/content/FriendContent";

const MessageContent:FC = () => {
    const {type}=useMessageStore(state => ({
        type:state.fid?"user":state.groupId?"group":"nothing"
    }),shallow)
    return(
        <div>
            {type === "user"? <FriendContent/>:
                type==="group"?
                    <div>group</div>:
                    <div>loading</div>
            }
        </div>
    )
}
export default MessageContent
