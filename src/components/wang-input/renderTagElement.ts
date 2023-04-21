import {IDomEditor, SlateElement} from "@wangeditor/editor";
import {h, VNode} from "snabbdom";

function renderTagElement(elem: SlateElement, children: VNode[] | null, editor: IDomEditor) {
    const {src,label,value}=(elem as any)
    const avatarImg = h(
        'img',
        {
            class:{"ddddd":true},
            props:{
                src:src
            }
        }
    )
    const avatarSpan = h(
        'span',
        {
            class:{
                "ant-avatar":true,
                "ant-avatar-circle":true,
                "ant-avatar-img":true,
            }
        },
        [avatarImg]
    )
    const labelStr = h(
        'strong',
        [label]
    )
    const labelSpan = h(
        'span',
        {
            class: {"ant-typography":true},
        },
        [labelStr]
    )
    const spaceItem=(child) => h(
        'div',{
            class: {"ant-space-item":true},
        },
        [child]
    )
    const spaceNode = h(
        'div',{
            class: {"ant-space":true},
            props:{
                "data-value":value,
            },
            style:{
                gap:"8px"
            }
        },
        [spaceItem(avatarSpan),spaceItem(labelSpan)]
    )
    console.log(9999,spaceNode)
    return spaceNode

}
export const renderTagConf = {
    type: 'tag', // 新元素 type ，重要！！！
    renderElem: renderTagElement,
}
