import {FC} from "react";
import {styled} from "umi";
import ActionHeader from "@/pages/contact/silder/ActionHeader";
import ContactList from "@/pages/contact/silder/ContactList";
import {theme} from 'antd'
const {useToken}=theme
const ContactSlider:FC = () => {
    const {token:{colorBgContainer,colorBorder}}=useToken()
    return(
        <StyledContactSlider style={{backgroundColor:colorBgContainer}}>
            <ActionHeader />
            <ContactList />
        </StyledContactSlider>
    )
}
export default ContactSlider
const StyledContactSlider = styled.div`
  height: 100%;
    display: flex;
  flex-direction: column;
`
