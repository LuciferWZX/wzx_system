import React, {FC, useState} from "react";
import {useUserStore} from "@/stores";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import useSendMessage from "@/pages/message/content/hooks/useSendMessage";
import {MessageType} from "@/types/message/Message";
import {Avatar, Button, Mentions, Popover, Space, Tooltip} from "antd";
import {styled} from "umi";
import {Icon} from "@@/exports";
import {SmileFilled, SmileOutlined} from "@ant-design/icons";
import data from '@emoji-mart/data'
import zh from '@emoji-mart/data/i18n/zh.json'
import Picker from '@emoji-mart/react'
import {Pos,position} from "caret-pos";
const { getMentions } = Mentions;
const MessageInput:FC = () => {
    const {contacts} = useUserStore(state => ({
        contacts:state.contacts
    }))
    const friendInfo = useMessageStore(state => state.friendInfo,shallow)
    const {sendMsg}=useSendMessage({type:"user"})
    const [text, setText] = useState("");
    const [pos, setPos] = useState<Pos|null>(null);
    const sendOneMsg=async ()=>{
        const mentions = getMentions(text);
        await sendMsg({
            fid:friendInfo.id,
            reminder: false,
            type:MessageType.text,
            content:text
        })
        setText("")
        updatePos()
    }
    const validateMsg=()=>{
        if (text.trim()===""){
            return false
        }
        return true
    }
    const onEmojiSelect=(value:{native:string})=>{
        const emoji = value.native
        const newText = text.substring(0, pos.pos) + emoji + text.substring(pos.pos);
        setText(newText)
        moveCursor(pos.pos+2)
    }
    const updatePos=()=>{
        const input = document.querySelector("#chat-input")
        const curPos = position(input)
        setPos(curPos)
    }
    const moveCursor=(step:number)=>{
        const input = document.querySelector("#chat-input")
        position(input,step)
        const curPos = position(input)
        setPos(curPos)
    }
    return(
        <StyledMessageInput>
            <div className={'msg-input-box'}>
                <Mentions
                    id={'chat-input'}
                    className={"msg-input"}
                    autoSize={{
                        maxRows:3,
                    }}
                    autoFocus={true}
                    value={text}
                    placeholder={`发送给 ${friendInfo.nickname}`}
                    onChange={setText}
                    onBlur={()=>updatePos()}
                    onFocus={()=>updatePos()}
                    options={contacts.map(contact=>{
                        return {
                            value:contact.friendInfo.nickname,
                            key:contact.id.toString(),
                            label:<Space><Avatar src={contact.friendInfo.avatar}/>{contact.friendInfo.nickname}</Space>
                        }
                    })}/>

                <Popover
                    trigger={['click']}
                    content={
                    <Picker
                        categories={['frequent','people']}
                        i18n={zh}
                        theme={'light'}
                        data={data}
                        onEmojiSelect={onEmojiSelect} />
                }>
                    <Button style={{marginRight:10}}  type={"text"} icon={<SmileOutlined />}></Button>
                </Popover>
                <Tooltip title={"发送(Shift+Enter)"}>
                    <Button onClick={()=>sendOneMsg()} disabled={!validateMsg()}  type={"primary"} icon={<Icon icon={"bi:send-fill"} className={"anticon"}/>}></Button>
                </Tooltip>
            </div>
        </StyledMessageInput>
    )
}
const StyledMessageInput = styled.div`
  .msg-input-box{
    display: flex;
    align-items: flex-end;
    .msg-input{
      flex: 1;
      margin-right: 10px;
    }
  }
    
`
export default MessageInput
