import React, {FC, Fragment, useEffect, useState} from "react";
import {Avatar, Button, Dropdown, MenuProps, Space, theme, Tooltip,Typography} from "antd"
import {Icon, styled,css} from "umi";
import {useControllableValue} from "ahooks";
import {Contact} from "@/types/friends/Contact";
import {MessageInstance} from "antd/es/message/interface";

import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";

const {useToken}=theme
const {Text,Link}=Typography
type ChatInputType = {
    value?:string
    rawHtml?:string
    onChange?:(text:string)=>void
    onChangeRawHtml?:(rawHtml:string)=>void
    recommends:Contact[],
    messageInstance:MessageInstance
    className?:string
    sendMsg?:(text:string,html:string,reminders:number[])=>Promise<any>
}
const ChatInput:FC<ChatInputType> = (props) => {
    const {value,rawHtml,onChange,onChangeRawHtml
    ,recommends}=props
    const [focused, setFocused] = useState<boolean>(false);
    const friendInfo = useMessageStore(state => state.friendInfo,shallow)
    const [html,setHtml]=useControllableValue<string>(props,{
        defaultValue:"",
        valuePropName:"rawHtml",
        trigger:"onChangeRawHtml"
    })
    const {token:{
        borderRadius,
        colorBgContainer,
        colorBorder,
        paddingXS,
        lineHeight,
        colorTextPlaceholder,
        fontSize,
        controlOutline,
        colorPrimaryHover,
        colorTextDisabled
    }}=useToken()
    const sendMessage=async ()=> {
        console.log("发送")
    }

    const items: MenuProps['items'] = recommends.map(contact=>{
        return {
            key:contact.id,
            label:(
                <Space>
                    <Avatar src={contact.friendInfo.avatar} />
                    <Text strong={true}>
                        {contact.friendInfo.nickname}
                    </Text>
                </Space>
            )
        }
    });

    return(
        <StyledChatInput
            tabIndex={1}
            placeholder={"请输入"}
            $placeholderColor={colorTextPlaceholder}
            $controlOutline={controlOutline}
            $colorPrimaryHover={colorPrimaryHover}
            $colorBorder={colorBorder}
            $isFocused={focused}
            style={{
                borderRadius:borderRadius,
                fontSize:fontSize,
                backgroundColor:colorBgContainer,
                padding:paddingXS,
                lineHeight:lineHeight
            }}

        >
            d
            <div className={'actions-btns'}>
                <Space >
                    <Tooltip title={"发送(Shift+Enter)"}>
                        <Button disabled={!html} style={{color:!html?colorTextDisabled:colorPrimaryHover}}  type={"text"} icon={<Icon icon={"bi:send-fill"} className={"anticon"}/>}></Button>
                    </Tooltip>
                </Space>
            </div>
        </StyledChatInput>
    )
}
const StyledChatInput = styled.div<{
    $placeholderColor:string
    $controlOutline:string
    $colorPrimaryHover:string
    $colorBorder:string
    $isFocused:boolean
}>`
  position: relative;
  transition-property: all;
  transition-duration: 0.4s;
  outline-color: ${({$controlOutline})=>$controlOutline} ;
  border: 1px solid ${({$colorBorder})=>$colorBorder};
  &:hover{
    border-color:${({$colorPrimaryHover})=>$colorPrimaryHover} ;
  }
  .chat-input{
    outline: none;
  }
  .user-tag{
    font-weight: bold;
  }
  ${({$isFocused,$colorPrimaryHover})=>{
      if ($isFocused){
          return css`
            border-color:${$colorPrimaryHover};
            box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
            outline: 0;
          `
      }
  }}
  &:empty:before {
    content: attr(placeholder);
    color: ${({$placeholderColor})=>$placeholderColor};
  }
  .actions-btns{
    text-align: right;
  }
  .user-selector-modal{
    position: absolute;
    background-color: red;
    left: 0;
    top: 0;
  }
`
export default ChatInput
