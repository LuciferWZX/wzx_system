import {DomEditor, IDomEditor} from "@wangeditor/editor";


export function withTag<T extends IDomEditor>(editor: T):T{
    const { isInline, isVoid, insertNode } = editor
    const newEditor = editor
    // 重写 isInline
    newEditor.isInline = elem => {
        const type = DomEditor.getNodeType(elem)
        if (type === 'tag') {
            return true
        }
        return isInline(elem)
    }

    // 重写 isVoid
    newEditor.isVoid = elem => {
        const type = DomEditor.getNodeType(elem)
        if (type === 'tag') {
            return true
        }

        return isVoid(elem)
    }

    // 返回 editor ，重要！
    return newEditor
}
