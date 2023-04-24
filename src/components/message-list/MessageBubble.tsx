import React, {FC} from "react";
import {styled} from "umi";

interface IProps{
    content?:string
}
const MessageBubble:FC<IProps> = ({content}) => {
    return(
        <StyledMessageBubble
            suppressContentEditableWarning
            contentEditable={false}
            dangerouslySetInnerHTML={{__html:content}}>
        </StyledMessageBubble>
    )
}
const StyledMessageBubble = styled.div`
`
export default MessageBubble
