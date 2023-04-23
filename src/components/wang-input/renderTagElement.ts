import {DomEditor, IDomEditor, SlateDescendant, SlateElement} from "@wangeditor/editor";
import {h, VNode} from "snabbdom";
import {TagElement} from "@/types/edit-custom-type/TagElement";

function renderTagElement(elem: SlateElement, children: VNode[] | null, editor: IDomEditor) {
    const {label,value}=(elem as any) as TagElement
    // 当前节点是否选中
    const selected = DomEditor.isNodeSelected(editor, elem)
    const tagNode = h(
        'span',{
            dataset:{
                userId:value
            },
          props:{
              contentEditable:false,
              className:"user-tag",
          },
        style:{
            color:"#4096ff",
            cursor:"pointer",
            border:
                selected
                    ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
                    : '2px solid transparent',
        }
        },
        [`@${label}`]
    )

    return tagNode

}
function tagToHtml(elem: SlateElement, childrenHtml: string):string{
    // 获取附件元素的数据
    const {label,value} = elem as any

    // 生成 HTML 代码
    const html = `<span data-w-e-type="tag" data-w-e-is-void data-w-e-is-inline data-label="${label}" data-value="${value}">${label}</span>`
    return html
}
function parseTagHtml(domElem: Element, children: SlateDescendant[], editor: IDomEditor): SlateElement {  // TS 语法
// function parseAttachmentHtml(domElem, children, editor) {                                                     // JS 语法

    // 从 DOM element 中获取“附件”的信息
    const label = domElem.getAttribute('data-label') || ''
    const value = domElem.getAttribute('data-value') || ''

    // 生成“附件”元素（按照此前约定的数据结构）
    const tagResume = {
        type: 'tag',
        label,
        value,
        children: [{ text: '' }], // void node 必须有 children ，其中有一个空字符串，重要！！！
    }
    return tagResume
}
export const renderTagConf = {
    type: 'tag', // 新元素 type ，重要！！！
    renderElem: renderTagElement,
}
export const elemToHtmlConf = {
    type: 'tag', // 新元素的 type ，重要！！！
    elemToHtml: tagToHtml,
}
export const parseHtmlConf = {
    selector: 'span[data-w-e-type="tag"]', // CSS 选择器，匹配特定的 HTML 标签
    parseElemHtml: parseTagHtml,
}
