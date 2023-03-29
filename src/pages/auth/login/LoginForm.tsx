import React, {FC} from "react";
import styled from "styled-components";
import {Button, Divider, Form, Input, Segmented, Space, Tooltip, Typography} from "antd";
import { Icon } from 'umi';
import {AlipayCircleOutlined, GithubOutlined, GoogleOutlined, QqOutlined, WechatOutlined} from "@ant-design/icons";
const {Text,Link}=Typography
type LoginFormType={
    type:"password"|"verifyCode",
    way:string
    value:string
}
const LoginForm:FC = () => {
    const [form] = Form.useForm<LoginFormType>()
    const onFinish=(values:LoginFormType)=>{

    }
    return(
        <StyledLoginForm>
            <Space direction={"vertical"} size={12} style={{width:"100%"}}>
                <Text strong={true} className={'title'}>登录</Text>
                <Text type={"secondary"} className={'desc'}>请填写您的信息</Text>
                <Form
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                        type:"password",
                        way:"",
                        value:"",
                    }}>
                    <Form.Item
                        name={"type"}>
                        <Segmented
                            size={"large"}
                            options={[
                            {label:"密码",value:'password',icon:<Icon className={"anticon"} icon="mdi:form-textbox-password" />},
                            {label:"验证码",value:'verifyCode',icon:<Icon className={"anticon"} icon="material-symbols:captive-portal" />,disabled:true},
                        ]} />
                    </Form.Item>
                    <Form.Item
                        name={"way"}
                        rules={[
                            {required:true,message:"请输入用户名/邮箱/手机号码"}
                        ]}>
                        <Input size={"large"} placeholder="请输入用户名/邮箱/手机号码" style={{width:"100%"}} allowClear={true}  />
                    </Form.Item>
                    <Form.Item
                        noStyle={true}
                        dependencies={["type"]}>
                        {({getFieldValue})=>{
                            const type:"password"|"verifyCode" = getFieldValue("type")
                            if (type === "password"){
                                return (
                                    <Form.Item
                                        name={"value"}
                                        rules={[
                                            {required:true,message:"请输入密码"}
                                        ]}>
                                        <Input.Password  size={"large"} placeholder="请输入密码" style={{width:"100%"}}  />
                                    </Form.Item>
                                )
                            }
                        }}
                    </Form.Item>
                    <Form.Item noStyle={true}>
                        <Button size={"large"} style={{float:'right'}} type="primary" htmlType="submit">
                            登录 <Icon className={"anticon"} icon="material-symbols:chevron-right-rounded" />
                        </Button>
                    </Form.Item>
                </Form>
                <Text>第三方登录</Text>
                <Space>
                    <Tooltip destroyTooltipOnHide={true} title={"Github"}>
                        <Button size={"large"} shape={"circle"} type={"text"} icon={<GithubOutlined />} />
                    </Tooltip>
                    <Tooltip destroyTooltipOnHide={true} title={"微信"}>
                        <Button size={"large"} shape={"circle"} type={"text"} icon={<WechatOutlined />} />
                    </Tooltip>
                    <Tooltip destroyTooltipOnHide={true} title={"QQ"}>
                        <Button size={"large"} shape={"circle"} type={"text"} icon={<QqOutlined />} />
                    </Tooltip>
                    <Tooltip destroyTooltipOnHide={true} title={"谷歌"}>
                        <Button size={"large"} shape={"circle"} type={"text"} icon={<GoogleOutlined />} />
                    </Tooltip>
                    <Tooltip destroyTooltipOnHide={true} title={"支付宝"}>
                        <Button size={"large"} shape={"circle"} type={"text"} icon={<AlipayCircleOutlined />} />
                    </Tooltip>

                </Space>
                <Divider/>
                <Space>
                    <Text>还没有账号？</Text>
                    <Link>去注册</Link>
                </Space>
            </Space>

        </StyledLoginForm>
    )
}
const StyledLoginForm = styled.div`
    .title{
      font-size:28px;
      line-height: 42px;
    }
  .desc{
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`
export default LoginForm
