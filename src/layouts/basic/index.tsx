import React,{FC} from "react"
import {Outlet, styled} from "umi";
import {Layout} from "antd";
import Header from "@/layouts/basic/header";
import {motion} from "framer-motion";
const BasicLayout:FC = () => {
    return(
            <StyledBasicLayout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>
                <Layout className={'layout-container'}>
                    <Header/>
                    <Layout.Content>
                        BasicLayout
                        <Outlet/>
                    </Layout.Content>
                </Layout>

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
