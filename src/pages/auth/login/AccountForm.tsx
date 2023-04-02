import React, {FC} from "react";
import {styled} from "umi";
import {Avatar, Button, Col, Divider, Row, Space, Typography} from "antd";
import {AccountCache} from "@/pages/auth/login/hooks/useAccounts";
import {Icon} from "@@/exports";
const {Text,Link}=Typography
type AccountFormProps = {
    accounts:AccountCache[]
}
const AccountForm:FC<AccountFormProps> = (props) => {
    const {accounts}=props
    return(
        <StyledAccountForm>
            <Space direction={"vertical"} size={12} style={{width:"100%"}}>
                <Text strong={true} className={'title'}>登录</Text>
                <Text type={"secondary"} className={'desc'}>请选择您的账户</Text>
                <Space direction={"vertical"} size={44} style={{width:"100%"}}>
                    <StyledAccountsBox>
                        {accounts.map(account=>{
                            return(
                                <AccountBox key={account.id}>
                                    <Space>
                                        <Avatar size={66} src={account.avatar} />
                                        <div className={'welcome'}>
                                            <Text type={"secondary"}>欢迎回来，</Text>
                                            <Text strong={true}>{account.nickname}</Text>
                                        </div>
                                    </Space>
                                </AccountBox>
                            )
                        })}
                    </StyledAccountsBox>
                    <Row align="middle">
                        <Col span={10}>
                            <Link>登录其他账号</Link>
                        </Col>
                        <Col span={14}>
                            <Button size={"large"} type="primary">
                                登录 <Icon className={"anticon"} icon="material-symbols:chevron-right-rounded" />
                            </Button>
                        </Col>
                    </Row>
                </Space>
                <Divider/>
                <Row align="middle">
                    <Col span={10}>
                        <Text>还没有账号？</Text>
                    </Col>
                    <Col span={14}>
                        <Link>去注册</Link>
                    </Col>
                </Row>
            </Space>
        </StyledAccountForm>
    )
}
const StyledAccountForm = styled.div`
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
const StyledAccountsBox = styled.div`
    max-height: 300px;
`
const AccountBox = styled.div`
    .welcome{
      font-weight: 500;
      font-size: 18px;
    }
`
export default AccountForm
