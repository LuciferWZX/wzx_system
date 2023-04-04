import React, {FC} from "react"
import {Outlet,styled} from "umi";
import {Col, Row,theme} from "antd";
import LottieAnimation from "@/layouts/auth/LottieAnimation";
import {AnimatePresence} from "framer-motion";
import {useLocation} from "@@/exports";

const {useToken}=theme
const AuthLayout:FC = () => {
    const {token:{colorBgContainer}}=useToken()
    const location = useLocation();
    return(
            <StyledAuthLayout>
                <Row className={'horizon-container'}  align="middle" >
                    <Col className={"logo-container"} flex={2} style={{flex:"2 2"}}>
                        <LottieAnimation />
                    </Col>
                    <Col  flex={3} className={'page-container'} style={{backgroundColor:colorBgContainer,flex:"3 3"}}>
                        <Outlet/>
                    </Col>
                </Row>
            </StyledAuthLayout>
    )
}
const StyledAuthLayout = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background: #56CCF2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .horizon-container{
    height: 100%;
  }
  .logo-container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;  
  }
  .page-container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`
export default AuthLayout
