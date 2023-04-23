import {FC} from "react";
import {WangInput} from "@/components";
import {useOutletContext} from "@@/exports";
import {OutletProps} from "@/layouts";
import {useUserStore} from "@/stores";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import useSendMessage from "@/pages/message/content/hooks/useSendMessage";
import {MessageType} from "@/types/message/Message";

const MessageInput:FC = () => {
    const {message}=useOutletContext<OutletProps>()
    const {contacts} = useUserStore(state => ({
        contacts:state.contacts
    }))
    const fid = useMessageStore(state => state.fid,shallow)
    const {sendMsg}=useSendMessage({type:"user"})
    // const {friendInfo} = useMessageStore(state => {
    //     return {
    //         friendInfo:state.orgConversations.find(con=>con.fid===state.fid)
    //     }
    // },shallow)
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
        <WangInput messageInstance={message} sendMsg={sendOneMsg} recommends={contacts} />
    )
}
export default MessageInput
