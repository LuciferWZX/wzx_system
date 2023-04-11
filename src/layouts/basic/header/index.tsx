import {styled, Icon, history, useOutletContext} from "umi";
import {Avatar, Typography, Layout, Space, theme, Dropdown, MenuProps, Badge} from "antd";
import React, {FC} from "react";
import {LoadingOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {OutletProps} from "@/layouts";
import {delay} from "@/utils/delay";
import {ReadyState} from "@/types/Socket";
import {useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
const {useToken}=theme
const {Text}=Typography
const Header:FC = () => {
    const {token:{colorBgContainer}}=useToken()
    const {user,readyState,clear}=useUserStore(state => ({
        user:state.user,
        readyState:state.readyState,
        clear:state.clear,
    }),shallow)
    const {modal}=useOutletContext<OutletProps>()
    const switchUser=async ()=>{
        let instance = modal.info({
            centered:true,
            width:70,
            transitionName:"ant-fade",
            icon:<LoadingOutlined />,
            footer:null
        })

        await delay(1000)
        instance.destroy()
        history.replace("/auth/accounts")
        clear()
    }
    const items: MenuProps['items'] = [
        {
            key:"setting",
            label:"设置",
            icon:<Icon style={{fontSize:18}} icon={"material-symbols:settings-suggest-outline-rounded"} className={"anticon"} />
        },

        {
            key:"switch",
            label:"切换用户",
            onClick:switchUser,
            icon:<UserSwitchOutlined />
        },
        {
            type:"divider"
        },
        {
            key:"logout",
            label:"退出登录",
            danger:true,
            icon:<Icon style={{fontSize:18}} icon={"ci:log-out"} className={"anticon"} />
        },
    ]
    return(
        <StyledHeader style={{backgroundColor:colorBgContainer}}>
            <div>xxxx</div>
            <Dropdown trigger={["click"]} menu={{ items }}>
                <AvatarBox >
                    <Space >
                        <Badge className={'the-dot'} style={{backgroundColor:readyState === ReadyState.Open?"hsl(102, 53%, 61%)":"red"}} dot={true} offset={[0, 40]}>
                            <Avatar shape={"square"} size={40} src={user?.avatar}/>
                        </Badge>
                        <Text className={"nickname"} strong={true}>{user?.nickname}</Text>
                        <Icon icon={"ic:round-keyboard-arrow-down"} className={"anticon done-icon"} />
                    </Space>
                </AvatarBox>
            </Dropdown>
        </StyledHeader>
    )
}
export default Header
const StyledHeader = styled(Layout.Header)`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`
const AvatarBox = styled.div`
  
  height: 57px;
  background-color:transparent ;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 10px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.2s;
  display: flex;
  align-content: center;
  .the-dot{
    .ant-badge-dot{
      width: 10px;
      height: 10px;
      min-width: 10px;
    }
  }
  &:hover{
    background-color:#F5F5F7 ;
    border: 1px solid #F5F5F7;
  }
  .ant-space-item{
    display: flex;
    .nickname{
      font-size: 16px;
    }
    .done-icon{
      font-size: 24px;
    }
  }

`
