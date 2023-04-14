import React, {FC, useLayoutEffect} from "react";
import {styled, history, useOutletContext} from "umi";
import {Avatar, Button, Col, Divider, Row, Space, Typography, theme} from "antd";
import useAccounts from "@/pages/auth/accounts/hooks/useAccounts";
import {Icon} from "@@/exports";
import {useRequest} from "ahooks";
// import userStore from "@/stores/user.store";
import {ResCode} from "@/types/APIResponseType";
import {motion} from "framer-motion";
import {OutletProps} from "@/layouts";
import {showLoginNotification} from "@/pages/auth/common";
import {useUserStore} from "@/stores";
import {handleInitData} from "@/utils/handleInitData";
import {MacScrollbar} from "mac-scrollbar";
const {Text,Link}=Typography
const {useToken}=theme

const AccountForm:FC = () => {
    const {token:{colorTextDisabled,controlItemBgHover}}=useToken()
    const {accounts,isOk,switchAccount,updateState}=useAccounts()
    const {runAsync:runSwitchProfile,loading:switchLoading}=useRequest(useUserStore.getState().switchProfile,{manual:true})
    const {message,notification}=useOutletContext<OutletProps>()
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
            message.open({
                type:"loading",
                content:"正在验证用户信息",
                duration:0,
                key:"switch-account"
            })

            const res = await runSwitchProfile(currentAccount.token)
            if (res.code === ResCode.success){
                message.destroy("switch-account")
                await handleInitData()
                showLoginNotification(notification,res.data)
                history.replace("/")
                return
            }
            updateState(currentAccount.id,true)
            message.open({
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
            <Space direction={"vertical"} size={12} style={{width:"100%"}}>
                <Text strong={true} className={'title'}>登录</Text>
                <Text type={"secondary"} className={'desc'}>请选择您的账户</Text>
                <Space direction={"vertical"} size={44} style={{width:"100%"}}>

                        <Space
                            direction={"vertical"}
                            size={4}
                            style={{width:"100%"}}>
                            {accounts?.[0] && (
                                <AccountBox
                                    initial={{ opacity: 0,  }}
                                    animate={{ opacity: 1}}
                                    transition={{ duration: 0.3 }}
                                    key={accounts[0].id}

                                >
                                    <Space>
                                        <Avatar size={66} src={accounts[0].avatar} />
                                        <div className={'welcome'}>

                                            <Text disabled={accounts[0].error} type={"secondary"}>欢迎回来，</Text>
                                            <Text  disabled={accounts[0].error}>{accounts[0].nickname}</Text>
                                        </div>
                                    </Space>
                                </AccountBox>
                            )}
                            <StyledAccountsBox>
                                {accounts.map((account,index)=>{
                                    if (index === 0){
                                        return null
                                    }
                                    return(
                                        <AccountBox
                                            // whileHover={{ scale: 1.1 }}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            key={account.id}
                                            $hoverBgColor={controlItemBgHover}
                                            style={{cursor:'pointer'}}>
                                            <div className={"other-account"}>
                                                <Avatar size={40} src={account.avatar} />
                                                <div className={'normal-list'}>
                                                    <Text disabled={account.error}  strong={true}>{account.nickname}</Text>
                                                </div>
                                                <Button className={'switch-btn'} disabled={switchLoading || account.error} onClick={()=>switchAccount(account.id)} type={"link"} icon={<Icon className={"anticon"} icon={"clarity:switch-line"} />}>切换</Button>
                                            </div>
                                        </AccountBox>
                                    )
                                })}
                            </StyledAccountsBox>
                        </Space>

                    <Row align="middle">
                        <Col span={10}>
                            <Link onClick={()=>history.replace("/auth/login")}>登录其他账号</Link>
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
const StyledAccountsBox = styled(MacScrollbar)`
    max-height: 200px;
    overflow-y: auto;
    overflow-x: inherit;
`
const AccountBox = styled(motion.div)<{$hoverBgColor?:string}>`
  border-radius: 6px;
  padding: 5px;
  &:hover{
    background-color: ${({$hoverBgColor})=>$hoverBgColor};
  }
  
    .welcome{
      font-weight: 500;
      font-size: 18px;
    }
  .other-account{
    display: flex;
    justify-content: center;
   
  }
  .normal-list{
      flex: 1;
      align-self: center;
    margin: 0 10px;
  }
  .switch-btn{
    align-self: center;
  }
`
export default AccountForm
