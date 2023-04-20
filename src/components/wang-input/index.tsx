import {FC, useEffect, useState} from "react";
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import {styled} from "umi";
import {theme} from "antd";
const {useToken}=theme
const WangInput:FC = () => {
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
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html, setHtml] = useState('')
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',

    }
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {

    }  // TS 语法
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
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
                    setEditor(editor)
                }}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
            />
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
  .editor{
    [data-slate-editor] p{
      margin: 0;
    }
    .w-e-text-placeholder{
      top: 0;
    }
  }
`
export default WangInput
