import {FC} from "react";
import {Message} from "@/types/message/Message";
import {styled} from "umi";
import {Avatar, Space,Typography} from "antd";
import {User} from "@/types/User";
import EditDisplay from "@/components/message-list/EditDisplay";
import MessageBubble from "@/components/message-list/MessageBubble";


const {Text}=Typography
type MessageListType = {
    messages:Message[]
    leftId:number,
    users:User[]
}
const MessageList:FC<MessageListType> = (props) => {
    const {messages,leftId,users}=props
    console.log("messages:",messages)
    return(
        <StyledMessageList>
            {messages.map(message=>{
                if (message.senderId === leftId){
                    const curUser = users.find(user=>user.id === message.senderId )
                    return(
                        <LeftUser
                            key={message.id}
                            avatar={curUser.avatar}
                            username={curUser.username}
                            createDate={{
                                value:curUser.createDate,
                                hide:false
                            }}
                            message={message.content}
                            />
                    )
                }
                const curUser = users.find(user=>user.id === message.senderId )
                return (
                    <RightUser
                        key={message.id}
                        avatar={curUser.avatar}
                        username={curUser.username}
                        createDate={{
                            value:curUser.createDate,
                            hide:false
                        }}
                        message={message.content}
                        read={message.read}
                    />
                )
            })}
        </StyledMessageList>
    )
}
type MessageListItemType = {
    avatar:string
    username:string,
    createDate:{
        value:string
        hide?:boolean
    }
    message:string
    read?:boolean

}
const LeftUser:FC<MessageListItemType> = (props) =>{
    const {message,avatar,username}=props
    return(
        <StyledMessageItem style={{textAlign:"left"}}>
            <Space align={"start"}>
                <Avatar size={50} src={avatar} />
                <div>
                    <Text strong={true} style={{fontSize:16}}>{username}</Text>
                    <div className={'left-content'}>
                        <MessageBubble content={message} />

                    </div>
                </div>
            </Space>
        </StyledMessageItem>
    )
}
const RightUser:FC<MessageListItemType> = (props) =>{
    const {message,avatar,username}=props
    return(
        <StyledMessageItem style={{textAlign:"right"}}>
            <Space align={"start"}>
                <div>
                    <Text strong={true} style={{fontSize:16}}>{username}</Text>
                    <div className={'right-content'} >
                        <MessageBubble content={message} />
                    </div>
                </div>
                <Avatar size={50} src={avatar} />
            </Space>
        </StyledMessageItem>
    )
}
const StyledMessageList = styled.div`
    
`
const StyledMessageItem = styled.div`
    .left-content{
      max-width: 300px;
      padding: 10px;
    }
    .right-content{
      text-align: left;
      max-width: 300px;
      padding: 10px;
      word-break: break-all;
    }
`
export default MessageList
