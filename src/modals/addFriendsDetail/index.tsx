import React, {FC, useLayoutEffect} from "react";
import {Icon, styled, useOutletContext} from "@@/exports";
import {Avatar, Button, Col, Descriptions, Form, Input, Modal, Row, Select, Space, theme, Typography} from "antd";
import {useContactStore, useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {OutletProps} from "@/layouts";
import {useRequest} from "ahooks";
import {ResCode} from "@/types/APIResponseType";

const {Text}=Typography
const {useToken}=theme
type FormType = {
    senderDesc:string
    senderRemark:string
    uGroupId:number
}
const AddFriendsDetailModal:FC = () => {
    const {visible,user} = useContactStore(state => ({
        visible:state.addFriendsDetailVisible,
        user:state.curUserDetail
    }),shallow)

    const {token:{colorPrimary}}=useToken()
    const {message}=useOutletContext<OutletProps>()
    const [form]=Form.useForm()
    const contactGroups=useUserStore(state => state.contactGroups,shallow)
    const {runAsync:sendRequest,loading}=useRequest(useUserStore.getState().sendFriendsRequest,{
        manual:true
    })
    useLayoutEffect(()=>{
        if (visible){
            form.setFieldsValue({
                senderRemark:user.nickname,
                uGroupId:1
            })
        }
    },[visible])
    const onFinish=async (values:FormType)=>{
        const res = await sendRequest({
            senderDesc:values.senderDesc,
            senderRemark:values.senderRemark,
            fid:user.id,
            uGroupId:values.uGroupId
        })
        if (res.code === ResCode.success){
            message.success("请求已发送，等待对方回应")
            onCancel()
        }else{
            message.error(res.message)
        }
    }
    const afterClose=()=>{
        useContactStore.setState({
            curUserDetail:null
        })
    }
    const onCancel=()=>{
        useContactStore.setState({
            addFriendsDetailVisible:false
        })
    }
    return(
        <Modal
            closeIcon={<Icon icon={"material-symbols:close-rounded"} className={"anticon"} />}
            open={visible}
            destroyOnClose={true}
            afterClose={afterClose}
            onCancel={onCancel}
            footer={null}
            title={<Text strong={true} style={{fontSize:18}}>{user?.nickname}</Text>}>
            {user?(
                <StyledUserInfo>
                    <Space direction={"vertical"} style={{width:"100%"}}>
                        <Row gutter={[10,10]} align={"middle"}>
                            <Col span={8}>
                                <div className={'content-avatar'}>
                                    <Avatar size={130} src={user.avatar} /><br/>

                                </div>
                            </Col>
                            <Col span={16}>
                                <Space direction={"vertical"}  style={{width:"100%"}}>

                                    <Descriptions size={"small"} column={1} bordered={true}>
                                        <Descriptions.Item label="DM"><Text strong={true} style={{color:colorPrimary}}>{user.dm}</Text></Descriptions.Item>
                                        <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
                                        <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
                                        <Descriptions.Item label="简介">{user.sign ??<Text type={"secondary"}>暂无~</Text>}</Descriptions.Item>
                                    </Descriptions>

                                </Space>
                            </Col>
                        </Row>
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

                </StyledUserInfo>):(null)}
        </Modal>
    )
}

export default AddFriendsDetailModal
const StyledUserInfo = styled.div`
  .content-avatar{
    text-align: center;
  }
`
