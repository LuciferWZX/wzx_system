import {FC} from "react";
import {Icon, styled,useLocation,history} from "umi";
import {Layout, Menu, MenuProps,theme} from "antd";
import SliderTop from "@/layouts/basic/Sider/SliderTop";

const {useToken}=theme
const Slider:FC = () => {
    const location = useLocation()
    const {token:{colorBgContainer}}=useToken()

    const changeMenu=(path:string)=>{
        history.push(path)
    }
    const items:MenuProps['items']=[
        {
            icon:<Icon icon={"mingcute:contacts-fill"} className={"anticon"} style={{fontSize:18}} />,
            key:"/contact",
            label:"通讯录",
            onClick:()=>changeMenu("/contact")
        },
        {
            icon:<Icon icon={"ph:wechat-logo-duotone"} className={"anticon"} style={{fontSize:18}}/>,
            key:"/message",
            label:"消息",
            onClick:()=>changeMenu("/message")
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
  }
  border-right: 1px solid rgba(5, 5, 5, 0.06);
  .ant-menu-light.ant-menu-root.ant-menu-vertical{
    border-inline-end: unset;
  }
`
