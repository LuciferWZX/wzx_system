import {FC, Fragment} from "react";
import {Icon, styled,useLocation,history} from "umi";
import {Badge, Layout, Menu, MenuProps, theme} from "antd";
import SliderTop from "@/layouts/basic/Sider/SliderTop";
import {useContactStore} from "@/stores";
import {shallow} from "zustand/shallow";

const {useToken}=theme
const Slider:FC = () => {
    const location = useLocation()
    const {token:{colorBgContainer}}=useToken()
    const {unHandleRequestNum}=useContactStore(state => ({
        unHandleRequestNum:state.unHandleRequestNum
    }),shallow)
    const changeMenu=(path:string)=>{
        history.push(path)
    }
    const items:MenuProps['items']=[
        {
            icon:<Icon icon={"ph:wechat-logo-duotone"} className={"anticon"} style={{fontSize:18}}/>,
            key:"/message",
            label:<Fragment>消息 <Badge count={0}/></Fragment>,
            onClick:()=>changeMenu("/message")
        },
        {
            icon:<Icon icon={"mingcute:contacts-fill"} className={"anticon"} style={{fontSize:18}} />,
            key:"/contact",
            label:<Fragment>通讯录<Badge count={unHandleRequestNum}/></Fragment>,
            onClick:()=>changeMenu("/contact")
        }
    ]
    return(
        <StyledSlider style={{backgroundColor:colorBgContainer}}>
            <SliderTop/>
            <Menu
                className={"slider-menu"}
                items={items}
                selectedKeys={[location.pathname]}
            />
        </StyledSlider>
    )
}
export default Slider

const StyledSlider = styled(Layout.Sider)`
  display: flex;
  flex-direction: column;
  .slider-menu{
    flex: 1;
    .ant-menu-item{
      position: relative;
      .ant-badge{
        float: right;
        top: 25%;
      }
    }
  }
  border-right: 1px solid rgba(5, 5, 5, 0.06);
  .ant-menu-light.ant-menu-root.ant-menu-vertical{
    border-inline-end: unset;
  }
`
