import {FC} from "react";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import {theme} from 'antd'
import {styled} from "umi";
import HeaderBar from "@/pages/message/slider/HeaderBar";
const {useToken}=theme
const MessageSlider:FC = () => {
    const {token:{colorBgContainer,colorBorder}}=useToken()
    const conversations = useMessageStore(state => state.conversations,shallow)
    console.log(111,conversations)
    return(
        <StyledMessageSlider style={{backgroundColor:colorBgContainer}}>
            <HeaderBar/>
            x
        </StyledMessageSlider>
    )
}
const StyledMessageSlider = styled.div`\
  height: 100%;
`
export default MessageSlider
