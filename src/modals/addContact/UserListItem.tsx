import React, {FC, useLayoutEffect} from "react";
import {styled, useOutletContext} from "umi";
import {Avatar, Button, Descriptions, Popover, Space, Typography, theme, Form, Input, Select} from "antd";
import {ContactUser} from "@/types/User";
import {Icon} from "@@/exports";
import {useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {useRequest} from "ahooks";
import {ResCode} from "@/types/APIResponseType";
import {OutletProps} from "@/layouts";
const {Text}=Typography
const {useToken}=theme
type ItemType = {
    avatar?:string
    title?:React.ReactNode
    content?:React.ReactNode
    className?:string
    user:ContactUser
}
const UserListItem:FC<ItemType> = (props) => {
    const {avatar,title,content,className,user}=props


    return(
        <StyledUserListItem className={className}>
            <Avatar size={46} src={avatar} />
            <div className={'content'}>
                <Text strong={true} className={'title'}>{title}</Text>
                <Text className={'second-content'} type={"secondary"}>{content}</Text>
            </div>
            <div className={"actions"}>
                <Popover
                    trigger={"click"}
                    destroyTooltipOnHide={true}
                    content={<UserForm user={user} />}>
                    <Button type={"primary"}>添加</Button>
                </Popover>
            </div>
        </StyledUserListItem>
    )
}
type UserFormType = {
    user:ContactUser
}
type FormType = {
    senderDesc:string
    senderRemark:string
    uGroupId:number
}
const UserForm:FC<UserFormType>=({user})=>{
    const {token:{colorPrimary}}=useToken()
    const {message}=useOutletContext<OutletProps>()
    const [form]=Form.useForm()
    const contactGroups=useUserStore(state => state.contactGroups,shallow)
    const {runAsync:sendRequest,loading}=useRequest(useUserStore.getState().sendFriendsRequest,{
        manual:true
    })
    useLayoutEffect(()=>{
        form.setFieldsValue({
            senderRemark:user.nickname,
            uGroupId:1
        })
    },[])
    const onFinish=async (values:FormType)=>{
        const res = await sendRequest({
            senderDesc:values.senderDesc,
            senderRemark:values.senderRemark,
            fid:user.id,
            uGroupId:values.uGroupId
        })
        if (res.code === ResCode.success){
            message.success("请求已发送，等待对方回应")
        }else{
            message.error(res.message)
        }
    }
    return (
        <StyledUserInfo>
            <div className={'content-avatar'}>
                <Avatar size={120} src={user.avatar} />
            </div>
            <Space direction={"vertical"}  style={{width:"100%"}}>
                <Text strong={true} style={{fontSize:18}}>{user.nickname}</Text>
                <Descriptions size={"small"} column={1} bordered={true}>
                    <Descriptions.Item label="DM"><Text strong={true} style={{color:colorPrimary}}>{user.dm}</Text></Descriptions.Item>
                    <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
                    <Descriptions.Item label="简介">{user.sign ??<Text type={"secondary"}>暂无~</Text>}</Descriptions.Item>
                </Descriptions>
                <Form
                    form={form}
                    disabled={loading}
                    onFinish={onFinish}>
                    <Form.Item
                        name={"senderDesc"}
                        label={"申请"}>
                        <Input.TextArea placeholder={"申请说明"}autoSize={{ minRows: 3, maxRows: 3 }} />
                    </Form.Item>
                    <Form.Item
                        name={"senderRemark"}
                        label={"备注"}>
                        <Input placeholder={"备注~"} />
                    </Form.Item>
                    <Form.Item
                        name={"uGroupId"}
                        label={"分组"}>
                        <Select placeholder={"分组"} suffixIcon={<Icon icon={"ic:round-keyboard-arrow-down"} className={"anticon"} style={{fontSize:19}} />}>
                            {contactGroups.map(group=>{
                                return(
                                    <Select.Option key={group.id} value={group.id} >
                                        {group.label}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item noStyle={true}>
                        <Button loading={loading} htmlType={"submit"} type={"primary"} block={true}>发送申请</Button>
                    </Form.Item>
                </Form>
            </Space>
        </StyledUserInfo>
    )
}
const StyledUserListItem = styled.div`
  display: flex;
  align-items: center;
  .content{
    flex: 1;
    margin:auto 10px;
    .title{
      display: block;
      font-size: 16px;
    }
    .second-content{
      display: block;
    }
  }
`
const StyledUserInfo = styled.div`
  width: 250px;
  .content-avatar{
    text-align: center;
  }
`
export default UserListItem
