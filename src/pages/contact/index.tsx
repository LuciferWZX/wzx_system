import {styled} from "umi";
import {Panel, PanelGroup} from "react-resizable-panels";
import React from "react";
import ContactSlider from "@/pages/contact/silder";
import ContactContent from "@/pages/contact/content";
import {ResizeHandler} from "@/components";

const ContactPage = () => {
    return(
        <StyledPanelGroup direction={"horizontal"}>
            <Panel defaultSize={25} style={{minWidth:280,maxWidth:380}}>
                <ContactSlider />
            </Panel>
            <ResizeHandler />
            <Panel>
                <ContactContent />
            </Panel>
        </StyledPanelGroup>
    )
}
const StyledPanelGroup = styled(PanelGroup)`
  
`
export default ContactPage
