import {FC, useEffect, useRef, useState} from "react";
import {Button, Space, theme, Tooltip} from "antd"
import {Icon, styled} from "umi";
import {css} from "@@/exports";
import {useControllableValue} from "ahooks";
import useHotkeys from "@/components/chat-input/useHotkeys";
import UserList from "@/components/chat-input/UserList";

const {useToken}=theme
type ChatInputType = {
    value?:string
    rawHtml?:string
    onChange?:(text:string)=>void
    onChangeRawHtml?:(rawHtml:string)=>void
}
const ChatInput:FC<ChatInputType> = (props) => {
    const {value,rawHtml,onChange,onChangeRawHtml}=props
    const [focused, setFocused] = useState<boolean>(false);
    const [text,setText]=useControllableValue<string>(props,{
        defaultValue:""
    })
    const [html,setHtml]=useControllableValue<string>(props,{
        defaultValue:"",
        valuePropName:"rawHtml",
        trigger:"onChangeRawHtml"
    })
    const ref = useRef<HTMLDivElement>(null)
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
    const checkAt=async ()=>{
        // 获取光标位置
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const { startContainer, startOffset } = range;
        const userSelect = document.getElementById("user-select");
        const position=getCursorPosition()
        console.log("position:",position)
        if (position){
            userSelect.style.display = "block";
            userSelect.style.left = `${position.x}px`;
            userSelect.style.top = `${position.y}px`;
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

    //     function switchLine(){
    //         // 获取可编辑元素
    //         const editable = document.querySelector('[contentEditable=true]');
    //
    // // 获取选中的范围
    //         const selection = document.getSelection();
    //         const range = selection.getRangeAt(0);
    //
    // // 获取选中范围的起始节点和偏移量
    //         const startContainer = range.startContainer;
    //         const startOffset = range.startOffset;
    //
    //         console.log(1,startContainer.nodeType)
    //         console.log(2,Node.TEXT_NODE)
    //     // 如果起始节点是文本节点，则在该节点后面插入一个换行符
    //         if (startContainer.nodeType === Node.TEXT_NODE) {
    //             const textNode:any= startContainer;
    //             // 将文本节点拆分成两个节点
    //             const newNode = textNode.splitText(startOffset);
    //
    //             // 在新节点前面插入一个换行符
    //             const brNode = document.createElement('br');
    //             editable.insertBefore(brNode, newNode);
    //
    //             // 将光标移到新节点之前
    //             const newRange = document.createRange();
    //             newRange.setStart(newNode, 0);
    //             newRange.setEnd(newNode, 0);
    //             selection.removeAllRanges();
    //             selection.addRange(newRange);
    //         }
    //         // 如果起始节点是元素节点，则在该节点下的指定偏移量后插入一个文本节点和一个换行符
    //         if (startContainer.nodeType === Node.ELEMENT_NODE) {
    //             // 获取指定偏移量后面的第一个子节点
    //             const nextNode = startContainer.childNodes[startOffset];
    //
    //             // 创建一个包含空格的文本节点和一个换行符节点
    //             const textNode = document.createTextNode('\u00A0'); // 这里是Unicode编码的空格字符
    //             const brNode = document.createElement('br');
    //
    //             // 在元素节点中插入文本节点和换行符节点
    //             startContainer.insertBefore(brNode, nextNode);
    //             startContainer.insertBefore(textNode, nextNode);
    //
    //             // 将光标移到新节点之前
    //             const newRange = document.createRange();
    //             newRange.setStart(textNode, 0);
    //             newRange.setEnd(textNode, 0);
    //             selection.removeAllRanges();
    //             selection.addRange(newRange);
    //         }
    //     }

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
                ref={ref}
                id={"msg-input"}
                className={'chat-input'}
                contentEditable={true}
                onKeyDown={(e)=>{
                    const { key, shiftKey } = e;
                    if (e.key === "@") {
                       checkAt()
                    }
                }}
                onInput={e => {
                    setHtml?.(e.currentTarget.innerHTML)
                    setText?.(e.currentTarget.textContent)
                }}
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
                dangerouslySetInnerHTML={{__html:rawHtml}} />
            <div className={'actions-btns'}>
                <Space >
                    <Tooltip title={"发送(Shift+Enter)"}>
                        <Button disabled={!text} style={{color:!text?colorTextDisabled:colorPrimaryHover}}  type={"text"} icon={<Icon icon={"bi:send-fill"} className={"anticon"}/>}></Button>
                    </Tooltip>
                </Space>
            </div>
            <UserList id={'user-select'}/>
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
`
export default ChatInput
