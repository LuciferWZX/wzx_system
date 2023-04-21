import {DomEditor, IDomEditor, SlateElement} from "@wangeditor/editor";
import {h, VNode} from "snabbdom";
import {TagElement} from "@/types/edit-custom-type/TagElement";

function renderTagElement(elem: SlateElement, children: VNode[] | null, editor: IDomEditor) {
    const {src,label,value}=(elem as any) as TagElement
    // 当前节点是否选中
    const selected = DomEditor.isNodeSelected(editor, elem)
    const avatarImg = h(
        'img',
        {
            props:{
                src:src,
                className:"custom-tag-avatar",
            }
        }
    )
    const labelStr = (h(
        'strong',{
          props:{
              contenteditable:false
          }
        },
        [label]
    ))

    const spaceNode = h(
        'div',{
            props:{
                "data-value":value,
                className:"custom-tag-container",
                contentEditable:false
            },
        },
        [avatarImg,labelStr]
    )
    const backgroundNode = h(
        'div',{
            props:{
                className:"tag-container-background"
            },
            style:{
                backgroundColor:"#4096ff",
                border:
                    selected
                        ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
                        : '2px solid transparent',
            }
        }
    )
    const containerNode = h(
        'div',{
            props:{
                "data-value":value,
                className:"custom-tag-container",
                contentEditable:false
            },
            style:{
                backgroundColor:"#4096ff",
                border:
                    selected
                        ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
                        : '2px solid transparent',
            }
        },
        [spaceNode]
    )
    return containerNode

}
function tagToHtml(elem: SlateElement, childrenHtml: string):string{
    // 获取附件元素的数据
    const { src,label,value } = elem as any

    // 生成 HTML 代码
    const html = `<span
        data-w-e-type="tag"
        data-w-e-is-void
        data-w-e-is-inline
        data-src="${src}"
        data-label="${label}"
        data-value="${value}"
    >${label}</span>`
    return html
}
export const renderTagConf = {
    type: 'tag', // 新元素 type ，重要！！！
    renderElem: renderTagElement,
}
export const elemToHtmlConf = {
    type: 'tag', // 新元素的 type ，重要！！！
    elemToHtml: tagToHtml,
}
