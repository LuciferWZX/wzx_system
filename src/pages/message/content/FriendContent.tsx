import {FC} from "react";
import {WangInput} from "@/components";
import {useUserStore} from "@/stores";
import {styled} from "umi";
import {useOutletContext} from "@@/exports";
import {OutletProps} from "@/layouts";

const FriendContent:FC = () => {
    const {message}=useOutletContext<OutletProps>()
    const {contacts} = useUserStore(state => ({
        contacts:state.contacts
    }))


    const sendMsg=async (text,html,reminders)=>{
        console.log({
            text,html,reminders
        })
    }
    return(
        <StyledFriendMessageContent>
            friendContent
            <div className={'input-area'}>
                <WangInput messageInstance={message} sendMsg={sendMsg} recommends={contacts} />
            </div>
        </StyledFriendMessageContent>
    )
}
const StyledFriendMessageContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 10px;
  overflow: auto;
  .input-area{
    position: absolute;
    width: 100%;
    padding: 10px;
    bottom: 10px;
    left: 0;
  }
`
export default FriendContent
