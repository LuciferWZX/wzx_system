import {FC, useEffect, useRef} from "react";
import {theme} from "antd"
import {styled} from "umi";

const {useToken}=theme
type ChatInputType = {
    value?:string
}
const ChatInput:FC = () => {
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
        colorPrimaryHover
    }}=useToken()
    useEffect(()=>{
        const selection = window.getSelection();
    },[])

    const onInnerHtmlChange=(html:string)=>{

    }
    return(
        <StyledChatInput
            ref={ref}
            className={'chat-input'}
            contentEditable={true}
            placeholder={"请输入"}
            $placeholderColor={colorTextPlaceholder}
            $controlOutline={controlOutline}
            $colorPrimaryHover={colorPrimaryHover}
            $colorBorder={colorBorder}
            onKeyDown={(e)=>{
                if (e.keyCode === 13) {
                    e.preventDefault()
                    //回车
                }
                console.log(1111,e.keyCode)
            }}
            style={{
                borderRadius:borderRadius,
                fontSize:fontSize,
                backgroundColor:colorBgContainer,
                padding:paddingXS,
                lineHeight:lineHeight
            }}
            onInput={e => {
                onInnerHtmlChange(e.currentTarget.innerHTML)
            }}
            dangerouslySetInnerHTML={{__html:'<strong contentEditable="false">xxx</strong>'}}
        />
    )
}
const StyledChatInput = styled.div<{
    $placeholderColor:string
    $controlOutline:string
    $colorPrimaryHover:string
    $colorBorder:string
}>`
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
  transition-property: all;
  transition-duration: 0.4s;
  outline-color: ${({$controlOutline})=>$controlOutline} ;
  border: 1px solid ${({$colorBorder})=>$colorBorder};
  &:hover{
    border-color:${({$colorPrimaryHover})=>$colorPrimaryHover} ;
  }
  
  &:focus{
   
    border-color:${({$colorPrimaryHover})=>$colorPrimaryHover};
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
  }
  &:empty:before {
    content: attr(placeholder);
    color: ${({$placeholderColor})=>$placeholderColor};
  }
`
export default ChatInput
