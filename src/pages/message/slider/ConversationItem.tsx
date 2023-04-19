import React, {FC} from "react";
import {styled,Icon} from "umi";
import {Avatar, Space, Tag, theme, Tooltip, Typography} from "antd";
import {Contact} from "@/types/friends/Contact";
import {useContactStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {GenderType} from "@/types/User";
import {Conversation} from "@/types/message/Conversation";
import {useMessageStore} from "@/stores/messageStore";

const {useToken}=theme
const {Text}=Typography
type ContactItem = {
    conversation:Conversation
    className?:string
}
const ConversationItem:FC<ContactItem> = (props) => {
    const {conversation,className}=props
    const {friendInfo}=conversation
    const fid = useMessageStore(state => state.fid,shallow)
    const {token:{
        controlItemBgActive,//选中的背景颜色
        controlItemBgHover,//hover的背景颜色
        controlItemBgActiveHover,//已经选中了的hover颜色
    }}=useToken()
    const selectFriend=()=>{
        useMessageStore.setState({
            fid:conversation.fid
        })
    }
    return(
        <StyledContactListItem
            className={className}
            onClick={selectFriend}
            $selectedBgColor={fid===conversation.fid?controlItemBgActive:"unset"}
            $hoverBgColor={fid===conversation.fid?controlItemBgActiveHover:controlItemBgHover}>
            <Avatar size={50} src={friendInfo?.avatar} />
            <div className={'item-info'}>
                <div className={'nickname-div'}>
                    <Text style={{fontSize:16,flex:1}} strong={true}>{friendInfo?.nickname}</Text>
                </div>
            </div>
        </StyledContactListItem>
    )
}
const StyledContactListItem = styled.div<{$hoverBgColor:string,$selectedBgColor:string}>`
    display: flex;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  background-color: ${({$selectedBgColor})=>$selectedBgColor};
  transition-property: background-color;
  transition-duration: 0.3s;
  &:hover{
    background-color:${({$hoverBgColor})=>$hoverBgColor}};
  }
  
`
export default ConversationItem
