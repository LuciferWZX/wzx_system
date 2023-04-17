import {FC} from "react";
import {styled} from "umi";
import {useContactStore} from "@/stores";
import {theme} from "antd"
import RequestDetailPage from "@/pages/contact/content/requestDetail";
import ContactDetailPage from "@/pages/contact/content/contactDetail";
import {shallow} from "zustand/shallow";
import {MacScrollbar} from "mac-scrollbar";
const {useToken}=theme
const ContactContent:FC = () => {
    const {token:{colorBgContainer}}=useToken()
    const {type}=useContactStore(state => ({
        type:state.selectType
    }),shallow)
    return(
        <StyledContactContent style={{backgroundColor:colorBgContainer}}>
            {type === "request"&&<RequestDetailPage/>}
            {type === "contact"&&<ContactDetailPage/>}
            {type === null && <div>nothing</div>}
        </StyledContactContent>
    )
}
export default ContactContent
const StyledContactContent = styled(MacScrollbar)`
  height: 100%;
  
`
