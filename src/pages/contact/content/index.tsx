import {FC} from "react";
import {styled} from "umi";
import {useContactStore} from "@/stores";
import {theme} from "antd"
import RequestDetailPage from "@/pages/contact/content/requestDetail";
import ContactDetailPage from "@/pages/contact/content/contactDetail";
import {shallow} from "zustand/shallow";
import {MacScrollbar} from "mac-scrollbar";
import EmptyInfo from "@/pages/contact/content/EmptyInfo";
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
            {type === null && <div className={'empty-info'}><EmptyInfo /></div>}
        </StyledContactContent>
    )
}
export default ContactContent
const StyledContactContent = styled(MacScrollbar)`
  height: 100%;
  .empty-info{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
