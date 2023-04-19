import React, {FC} from "react";
import {Panel, PanelGroup} from "react-resizable-panels";
import {ResizeHandler} from "@/components";
import {styled} from "umi";
import MessageSlider from "@/pages/message/slider";
import MessageContent from "@/pages/message/content";

const MessagePage:FC = () => {
    return(
        <StyledPanelGroup direction={"horizontal"}>
            <Panel defaultSize={25} maxSize={28} minSize={25}>
                <MessageSlider/>
            </Panel>
            <ResizeHandler />
            <Panel>
                <MessageContent/>
            </Panel>
        </StyledPanelGroup>
    )
}
const StyledPanelGroup = styled(PanelGroup)`
  
`
export default MessagePage
