import React, {FC, useEffect, useState} from "react";
import {Avatar, Button, Dropdown, MenuProps, Space, theme, Tooltip,Typography} from "antd"
import {Icon, styled} from "umi";
import {css} from "@@/exports";
import {useControllableValue} from "ahooks";
import useHotkeys from "@/components/chat-input/useHotkeys";
import {Pos, position} from "caret-pos";
import {Contact} from "@/types/friends/Contact";
import {MessageInstance} from "antd/es/message/interface";
import {renderToStaticMarkup} from "react-dom/server";
import {render} from "react-dom";

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
    const [open,setOpen]=useState<boolean>(false)
    const [focused, setFocused] = useState<boolean>(false);
    const [text,setText]=useControllableValue<string>(props,{
        defaultValue:""
    })
    const [html,setHtml]=useControllableValue<string>(props,{
        defaultValue:"",
        valuePropName:"rawHtml",
        trigger:"onChangeRawHtml"
    })
    const [curPos, setPos] = useState<Pos>(null);
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
    useEffect(()=>  {
        const selectionChanged=()=>{
            updatePos()
        }
        const input = document.getElementById("msg-input");
        input.addEventListener("selectionchange",selectionChanged)
        return ()=>{
            input.removeEventListener("selectionchange",selectionChanged)
        }
    },[])
    const checkAt=async ()=>{
        setOpen(true)
        const dom = document.querySelector("#msg-input")
        const {left,top} = position(dom)
        // 获取光标位置
        // const selection = window.getSelection();
        // const range = selection.getRangeAt(0);
        // const { startContainer, startOffset } = range;
        const userSelect = document.getElementById("user-selector");

        console.log("position:",left,top)
        if (position){
            userSelect.style.display = "block";
            userSelect.style.left = `${left}px`;
            userSelect.style.top = `${top}px`;
        }
    }
    const getCursorPosition=():{x:number,y:number}|null=>{
        const inputField = document.getElementById("msg-input");
        const inputRect = inputField.getBoundingClientRect();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const x = rect.left - inputRect.left;
        const y = rect.bottom - inputRect.top;
        return {
            x:x,
            y:y
        }
    }
    useHotkeys(focused,{
        sendMsg:sendMessage,
    })

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
    const updatePos=()=>{
        const input = document.querySelector("#msg-input")
        const pos = position(input)
        setPos(pos)
    }
    const setCursor=(pos:number)=>{
        const input = document.querySelector("#msg-input")
        position(input,pos)
    }
    console.log(99,curPos)
    const removeAt=()=>{
        const element = document.getElementById("msg-input");
        // 获取光标所在位置
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;
        // 获取光标前面的文本
        const text = element.textContent.slice(0, cursorPosition);
        // 如果文本以 "@" 开头，则删除该字符并将光标往前移动一个字符
        if (text.endsWith("@")) {
            range.setStart(range.startContainer, cursorPosition - 1);
            range.deleteContents();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    const mentionLink=(value:string,label) => <Link strong={true} contentEditable={false} data-value={value}>@{label}</Link>
    const insertNode=(key:string)=>{
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        range.deleteContents();

        const reactNode = document.createElement('div');
        const info = recommends.find(recommend=>recommend.id.toString()===key)
        render(mentionLink(info.id.toString(),info.friendInfo.username), reactNode);

        const fragment = document.createDocumentFragment();
        const children = reactNode.children;
        for (let i = 0; i < children.length; i++) {
            fragment.appendChild(children[i].cloneNode(true));
        }

        range.insertNode(fragment);
        selection.removeAllRanges();
    }
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
            <div
                id={"msg-input"}
                className={'chat-input'}
                contentEditable={true}
                suppressContentEditableWarning
                onKeyDown={(e)=>{
                    const { key, shiftKey } = e;
                    if (e.key === "@") {
                        checkAt()
                    }
                }}
                onInput={e => {
                    updatePos()
                    setHtml?.(e.currentTarget.innerHTML)
                    setText?.(e.currentTarget.textContent)
                }}
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
            >
            </div>
            <div className={'user-selector-modal'} id={'user-selector'}>
                <Dropdown
                    menu={{
                        items ,
                        onClick:({key})=> {
                            setCursor(curPos.pos)
                            removeAt()
                            insertNode(key)
                            setOpen(false)
                            // selection.addRange(range);
                        },
                        style:{
                            minWidth:180
                        },
                    }}
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                    open={open}>
                    <span style={{height:2,width:2}} />
                </Dropdown>
            </div>
            <div className={'actions-btns'}>
                <Space >
                    <Tooltip title={"发送(Shift+Enter)"}>
                        <Button disabled={!text} style={{color:!text?colorTextDisabled:colorPrimaryHover}}  type={"text"} icon={<Icon icon={"bi:send-fill"} className={"anticon"}/>}></Button>
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
