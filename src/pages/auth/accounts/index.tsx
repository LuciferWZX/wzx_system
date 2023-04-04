import React, {FC, useLayoutEffect} from "react";
import {styled,history} from "umi";
import {Avatar, Button, Col, Divider, Row, Space, Typography, theme, message} from "antd";
import useAccounts, {AccountCache} from "@/pages/auth/accounts/hooks/useAccounts";
import {Icon} from "@@/exports";
import {useRequest} from "ahooks";
import userStore from "@/stores/user.store";
import {ResCode} from "@/types/APIResponseType";
import {LayoutGroup, motion} from "framer-motion";
const {Text,Link}=Typography
const {useToken}=theme

const AccountForm:FC = () => {
    const {token:{colorTextDisabled}}=useToken()
    const {accounts,isOk,switchAccount,updateState}=useAccounts()
    const {runAsync:runSwitchProfile,loading:switchLoading}=useRequest(userStore.action.switchProfile,{manual:true})
    const [messageApi, contextHolder] = message.useMessage();
    useLayoutEffect(()=>{
        if (isOk && accounts.length===0){
            history.replace("/auth/login")
        }
    },[isOk])
    if (!isOk){
        return null
    }
    const loginCacheCount=async ()=>{
        if (accounts && accounts.length>0){
            const currentAccount = accounts[0]
            messageApi.open({
                type:"loading",
                content:"正在验证用户信息",
                duration:0,
                key:"switch-account"
            })
            const res = await runSwitchProfile(currentAccount.token)
            if (res.code === ResCode.success){
                messageApi.destroy("switch-account")
                history.replace("/")
                return
            }
            updateState(currentAccount.id,true)
            messageApi.open({
                type:"error",
                icon:<Icon icon={"material-symbols:cancel-rounded"} className={"anticon"} />,
                content:res.message,
                key:"switch-account"
            })
        }
    }
    return(
        <StyledAccountForm
            key="accounts_page"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 , transition: { duration: 0.5 }}}
            exit={{ x: 20, opacity: 0 }}>
            {contextHolder}
            <Space direction={"vertical"} size={12} style={{width:"100%"}}>
                <Text strong={true} className={'title'}>登录</Text>
                <Text type={"secondary"} className={'desc'}>请选择您的账户</Text>
                <Space direction={"vertical"} size={44} style={{width:"100%"}}>
                    <StyledAccountsBox>
                        <Space direction={"vertical"}>
                            {accounts.map((account,index)=>{
                                if (index === 0){
                                    return(
                                        <AccountBox
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            key={account.id}>
                                            <Space>
                                                <Avatar size={66} src={account.avatar} />
                                                <div className={'welcome'}>

                                                    <Text disabled={account.error} type={"secondary"}>欢迎回来，</Text>
                                                    <Text  disabled={account.error}>{account.nickname}</Text>
                                                </div>
                                            </Space>
                                        </AccountBox>
                                    )
                                }
                                return(
                                    <AccountBox
                                        whileHover={{ scale: 1.1 }}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        key={account.id}
                                        style={{cursor:'pointer'}}>
                                        <Space>
                                            <Avatar size={40} src={account.avatar} />
                                            <div className={'normal-list'}>
                                                <Text disabled={account.error}  strong={true}>{account.nickname}</Text>
                                            </div>
                                            <Button disabled={switchLoading || account.error} onClick={()=>switchAccount(account.id)} type={"link"} icon={<Icon className={"anticon"} icon={"clarity:switch-line"} />}>切换</Button>
                                        </Space>
                                    </AccountBox>
                                )
                            })}

                        </Space>
                    </StyledAccountsBox>
                    <Row align="middle">
                        <Col span={10}>
                            <Link onClick={()=>history.push("/auth/login")}>登录其他账号</Link>
                        </Col>
                        <Col span={14}>
                            <Button disabled={accounts.length>0&&accounts[0].error} loading={switchLoading} onClick={loginCacheCount} size={"large"} type="primary">
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
const StyledAccountForm = styled(motion.div)`
  width: 340px;
  min-height: 385px;
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
const AccountBox = styled(motion.div)`
    .welcome{
      font-weight: 500;
      font-size: 18px;
    }
  .normal-list{
    
  }
`
export default AccountForm
