import React,{FC} from "react"
import {Outlet, styled} from "umi";
import {Layout} from "antd";
import Header from "@/layouts/basic/header";
const BasicLayout:FC = () => {
    return(
            <StyledBasicLayout>
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
const StyledBasicLayout = styled.div`
  height: 100%;
  .layout-container{
    height: 100%;
  }
`
export default BasicLayout
