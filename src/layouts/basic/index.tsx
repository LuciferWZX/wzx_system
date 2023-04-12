import React,{FC} from "react"
import {Outlet, styled} from "umi";
import {Layout} from "antd";
import Header from "@/layouts/basic/header";
import {motion} from "framer-motion";
import Slider from "@/layouts/basic/Sider";
import AddContactModal from "../../modals/addContact";
const BasicLayout:FC = () => {
    // const {token:{colorBgContainer}}=useToken()
    return(
            <StyledBasicLayout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>
                <Layout className={'layout-container'}>
                    <Slider/>
                    <Layout>
                        <Header/>
                        <Layout.Content>
                            <Outlet/>
                        </Layout.Content>
                    </Layout>
                </Layout>
                <AddContactModal />
            </StyledBasicLayout>
    )
}
const StyledBasicLayout = styled(motion.div)`
  height: 100%;
  .layout-container{
    height: 100%;
  }
`
export default BasicLayout
