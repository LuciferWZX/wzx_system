import React, {FC, useEffect, useState} from "react";
import '@wangeditor/editor/dist/css/style.css'
import { Editor } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig} from '@wangeditor/editor'
import {styled} from "umi";
import {Avatar, Button, Dropdown, MenuProps, Space, theme, Tooltip, Typography} from "antd";
import hotkeys from "hotkeys-js";
import {position} from "caret-pos";
import {Contact} from "@/types/friends/Contact";
import {withTag} from "@/components/wang-input/plugin";
import {Icon} from "@@/exports";
import {useLatest} from "ahooks";
import {MessageInstance} from "antd/es/message/interface";
const {useToken}=theme
const {Text}=Typography
type WangInputType = {
    recommends:Contact[],
    messageInstance:MessageInstance
    className?:string
    sendMsg?:(text:string,html:string,reminders:number[])=>Promise<any>
}

const WangInput:FC<WangInputType> = (props) => {
    const {recommends,className,sendMsg,messageInstance}=props
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
    const AT = "shift+2"
    // editor 实例
    const [_editor, setEditor] = useState<IDomEditor | null>(null)
    const editor=useLatest(_editor).current
    // 编辑器内容
    const [html, setHtml] = useState('')
    const [text, setText] = useState('')
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
    }
    useEffect(()=>{
        hotkeys.filter = (event)=>{
            const target = event.target
            return (target as HTMLDivElement).isContentEditable
        }
        hotkeys(AT,(keyboardEvent)=>{
            handleAT()
        })
        return ()=>{
            hotkeys.unbind(AT)
        }
    },[])

    // 及时销毁 editor ，重要！
    useEffect(() => {

        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)

        }
    }, [editor])
    const validateMsg = ()=>{
        const isEmpty = text.trim().replace(/[\n\r]/g, "") === "";
        if (isEmpty){
            return false
        }
        return true
    }
    const clickToSend=async ()=>{
        if (!validateMsg()){
            messageInstance.warning({content:"内容不能为空！",key:"msg_error"})
            return
        }
       const tagsElements = document.querySelectorAll('*[data-user-id]');
        let ids:number[]=[]
        tagsElements.forEach(ele=>{
            const id = ele.getAttribute("data-user-id")
            ids.push(parseInt(id))
        })
        await sendMsg?.(text,html,ids)
        setHtml("")
        setText("")
    }
    const handleAT=()=>{
        const dom = document.querySelector('*[data-slate-editor]')
        const pos = position(dom);
        const {left,top}=pos
        const userSelectedDom = document.getElementById("user-select")
        showDropdown(true)
        userSelectedDom.style.left = `${left}px`
        userSelectedDom.style.top = `${top}px`
    }
    const showDropdown=(visible:boolean)=>{
        const userSelectedDom = document.getElementById("user-select")
        userSelectedDom.style.display = visible === true?`unset`:"none"
    }
    const selectRecommend=(key:string)=>{
        showDropdown(false)
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
        <StyledWangInput
            $placeholderColor={colorTextPlaceholder}
            $controlOutline={controlOutline}
            $colorPrimaryHover={colorPrimaryHover}
            $colorBorder={colorBorder}
            className={className}
            style={{
                borderRadius:borderRadius,
                fontSize:fontSize,
                backgroundColor:colorBgContainer,
                padding:paddingXS,
                lineHeight:lineHeight
            }}>
            <Editor
                className={'editor'}
                defaultConfig={editorConfig}
                value={html}
                onCreated={(editor)=>{
                    const withTagEditor= withTag(editor)
                    setEditor(withTagEditor)
                }}
                onChange={editor => {
                    editor.restoreSelection()
                    setHtml(editor.getHtml())
                    setText(editor.getText())
                }}
                mode="simple"
            />
            <div style={{textAlign:"right"}}>
                <Space >
                    <Tooltip title={"发送(Shift+Enter)"}>
                        <Button onClick={clickToSend} disabled={!validateMsg()} style={{color:!validateMsg()?colorTextDisabled:colorPrimaryHover}}  type={"text"} icon={<Icon icon={"bi:send-fill"} className={"anticon"}/>}></Button>
                    </Tooltip>
                </Space>
            </div>
            <div id={'user-select'} className={'user-select-model'} >
                <Dropdown
                    menu={{
                        items,
                        style:{
                            minWidth:180
                        },
                        onClick:({key})=>{
                            const item = recommends.find(rec=>rec.id.toString() === key)
                            const node = {
                                type: 'tag',
                                label:item.friendInfo.nickname,
                                value:item.id,
                                children: [{text:""}]
                            }
                            editor.restoreSelection()
                            editor.deleteBackward("character")
                            editor.insertNode(node)
                            selectRecommend(key)
                        }
                    }}
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                    open={true}>
                    <span style={{display:"inline-block"}}/>
                </Dropdown>
            </div>
        </StyledWangInput>
    )
}
const StyledWangInput = styled.div<{
    $placeholderColor:string
    $controlOutline:string
    $colorPrimaryHover:string
    $colorBorder:string
}>`
  transition-property: all;
  transition-duration: 0.4s;
  outline-color: ${({$controlOutline})=>$controlOutline} ;
  border: 1px solid ${({$colorBorder})=>$colorBorder};
  //max-height: 300px;
  position: relative;
  font-size: 40px;
  .editor{
    max-height: 200px;
    overflow: auto;
    [data-slate-editor] p{
      margin: 0;
    }
    .w-e-text-placeholder{
      top: 0;
    }
  }
  .user-select-model{
    display: none;
    position: absolute;
  }
`
export default WangInput
