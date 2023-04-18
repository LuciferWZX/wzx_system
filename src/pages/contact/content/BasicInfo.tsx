import React, {FC} from "react";
import {ContactUser, User} from "@/types/User";
import {Descriptions, Image, Space,Typography,theme} from "antd";
import {styled} from "umi";

const {Text}=Typography
const {useToken}=theme
type BasicInfoType = {
    user:ContactUser |User
    extendData?:Array<{id:any,label:React.ReactNode,value:React.ReactNode}>
}
const BasicInfo:FC<BasicInfoType> = (props) => {
    const {user,extendData}=props
    const {token:{colorPrimary}}=useToken()
    return(
        <StyledBasicInfo>
            <Space align={"center"} direction={"vertical"} className={"vertical-container"}>
                <Image
                    preview={{
                        maskClassName:"mask-class"
                    }}
                    width={200}
                    className={'user-avatar'}
                    src={user.avatar} />
                <div>
                    <Text strong={true} style={{fontSize:24}}>{user.nickname}</Text>
                </div>
                <Descriptions size={"small"} column={1} bordered={true} style={{width:400}}>
                    <Descriptions.Item label="DM"><Text strong={true} style={{color:colorPrimary}}>{user.dm}</Text></Descriptions.Item>
                    <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
                    <Descriptions.Item label="简介">{user.sign ??<Text type={"secondary"}>暂无~</Text>}</Descriptions.Item>
                    {extendData?.filter(_data=>_data).map(data=>{
                        return (
                            <Descriptions.Item key={data.id} label={data.label}>{data.value}</Descriptions.Item>
                        )
                    })}
                </Descriptions>
            </Space>
        </StyledBasicInfo>
    )
}
const StyledBasicInfo = styled.div`
  .vertical-container{
    width: 100%;
    .user-avatar{
      border-radius: 50%;
    }
    .mask-class{
      border-radius: 50%;
    }
    .base-info{
      width: 300px;
    }
  }
`
export default BasicInfo
