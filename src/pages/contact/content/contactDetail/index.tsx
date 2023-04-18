import {FC} from "react";
import {styled} from "umi";
import BasicInfo from "@/pages/contact/content/BasicInfo";
import useContact from "@/pages/contact/content/requestDetail/useContact";
import {Button, Space} from "antd";

const ContactDetailPage:FC = () => {
    const {friendInfo}=useContact()
    const makeConversation=()=>{
        //发消息
    }
    const openDelete=()=>{

    }
    if (!friendInfo){
        return <div>loading</div>
    }
    return(
        <StyledContactDetailPage>
            <div className={'info-container'}>
                <BasicInfo user={friendInfo}/>
                <Space style={{marginTop:20}}>
                    <Button type={"primary"} onClick={makeConversation}>发送消息</Button>
                    <Button danger={true} onClick={openDelete} type={"text"}>删除好友</Button>
                </Space>
            </div>

        </StyledContactDetailPage>
    )
}
export default ContactDetailPage
const StyledContactDetailPage = styled.div`
    padding: 20px;
    display: flex;
  flex-direction: column;
      align-items: center;
    .info-container{
      max-width: 700px;
    }
`
