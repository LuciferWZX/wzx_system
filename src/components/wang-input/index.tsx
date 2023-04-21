import React, {FC, useEffect, useState} from "react";
import '@wangeditor/editor/dist/css/style.css'
import { Editor } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig} from '@wangeditor/editor'
import {styled} from "umi";
import {Avatar, Dropdown, MenuProps, Space, theme,Typography} from "antd";
import hotkeys from "hotkeys-js";
import {position} from "caret-pos";
import {Contact} from "@/types/friends/Contact";
import {withTag} from "@/components/wang-input/plugin";
const {useToken}=theme
const {Text}=Typography
type WangInputType = {
    recommends:Contact[]
}

const WangInput:FC<WangInputType> = (props) => {
    const {recommends}=props
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
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html, setHtml] = useState('')
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
    }
    useEffect(()=>{
        hotkeys.filter = (event)=>{
            const target = event.target
            return (target as HTMLDivElement).isContentEditable
        }
        hotkeys(AT,()=>{
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
    const handleAT=()=>{
        const dom = document.querySelector("#w-e-textarea-1")

        const pos = position(dom);
        console.log(111,pos)
        const {left,top}=pos
        const userSelectedDom = document.getElementById("user-select")

        userSelectedDom.style.display = "unset"
        userSelectedDom.style.left = `${left}px`
        userSelectedDom.style.top = `${top}px`

    }
    const selectRecommend=(key:string)=>{
        console.log(1111,key)
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
                    // const text = editor.getText()
                    // if (editor.selection){
                    //     // 获取当前光标位置
                    //     const basePoint = editor.selection.anchor
                    //     const content =text.substring(0, basePoint.offset)
                    //     let lastChar = content[basePoint.offset-1]
                    //     //如果前面的光标是@的话出现弹窗
                    //     if (lastChar === "@") {
                    //
                    //     }
                    //     setHtml(editor.getHtml())
                    // }

                    setHtml(editor.getHtml())
                }}
                mode="simple"
            />
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
                                src:item.friendInfo.avatar,
                                label:item.friendInfo.nickname,
                                value:item.id,
                                children: [{text:""}]
                            }
                            editor.restoreSelection()
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
  max-height: 300px;
  position: relative;
  font-size: 40px;
  .editor{
    
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
