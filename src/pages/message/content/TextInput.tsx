import {FC} from "react";
import {styled} from "umi";
import {ChatInput} from "@/components";
import {useOutletContext} from "@@/exports";
import {OutletProps} from "@/layouts";
import {useUserStore} from "@/stores";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import useSendMessage from "@/pages/message/content/hooks/useSendMessage";
import {MessageType} from "@/types/message/Message";

const TextInput:FC = () => {
    const {message}=useOutletContext<OutletProps>()
    const {contacts} = useUserStore(state => ({
        contacts:state.contacts
    }))
    const fid = useMessageStore(state => state.fid,shallow)
    const {sendMsg}=useSendMessage({type:"user"})
    const sendOneMsg=async (text,html,reminders)=>{
        console.log({
            text,html,reminders
        })
        await sendMsg({
            fid,
            reminder: false,
            type:MessageType.text,
            content:html
        })
    }
    return(
        <StyledTextInput>
            <ChatInput messageInstance={message} sendMsg={sendOneMsg} recommends={contacts} />
        </StyledTextInput>
    )
}
const StyledTextInput = styled.div`
    padding: 10px;
`
export default TextInput
