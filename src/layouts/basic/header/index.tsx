import {styled,useSnapshot,Icon,history} from "umi";
import {Avatar, Typography, Layout, Space, theme, Dropdown, MenuProps} from "antd";
import userStore from "@/stores/user.store";
import {FC} from "react";
import {User} from "@/types/User";
import {UserSwitchOutlined} from "@ant-design/icons";
const {useToken}=theme
const {Text}=Typography
const Header:FC = () => {
    const {token:{colorBgContainer}}=useToken()
    const {avatar,nickname}=useSnapshot(userStore.state).user as User

    const switchUser=()=>{
        history.push("/auth/accounts")
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
            <Dropdown trigger={["click"]} destroyPopupOnHide={true} menu={{ items }}>
                <AvatarBox >
                    <Space>
                        <Avatar shape={"square"} size={40} src={avatar}/>
                        <Text className={"nickname"} strong={true}>{nickname}</Text>
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
