import {FC} from "react";
import {history, styled} from "umi";
import BasicInfo from "@/pages/contact/content/BasicInfo";
import useContact from "@/pages/contact/content/requestDetail/useContact";
import {Button, Space} from "antd";
import store from "storejs";
import {StoreKey} from "@/types/StoreKey";
import {updateConversations} from "@/utils/handleConversations";
import {Conversation} from "@/types/message/Conversation";
import {useMessageStore} from "@/stores/messageStore";

const ContactDetailPage:FC = () => {
    const {friendInfo}=useContact()
    const makeConversation=async ()=>{
        //发消息
        const conversations:Conversation[] = store.get(StoreKey.Conversations) ?? []
        if (!conversations.find(_cs=>_cs.fid === friendInfo.id)){
            //没有就用默认数据填充
            const conversation:Conversation = {
                fid: friendInfo.id,
                friendInfo: friendInfo,
                noDisturb: false,
                unRead: 0
            }
            await updateConversations(conversation)
        }
        useMessageStore.setState({
            fid:friendInfo.id,
            groupId:null
        })
        //有就直接跳转
        history.push({
            pathname:"/message",
        })

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
