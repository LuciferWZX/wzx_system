import React, {FC, useEffect, useState} from "react";
import {Editor} from "@wangeditor/editor-for-react";
import {withTag} from "@/components/wang-input/plugin";
import {IDomEditor} from "@wangeditor/editor";
import {useMessageStore} from "@/stores/messageStore";

interface IProps{
    html:string
}
const EditDisplay:FC<IProps> = (props) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    useEffect(() => {
        if (editor){
            editor.setHtml(props.html)
        }
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return(
        <Editor
            onCreated={(editor)=>{
              withTag(editor)
                setEditor(editor)
            }}
            defaultConfig={{
                readOnly:true
            }}
            mode="simple"
        />
    )
}
export default EditDisplay
