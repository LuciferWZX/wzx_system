import {FC} from "react";
import {styled,Icon,history} from "umi";
import LoginForm from "@/pages/auth/login/LoginForm";
import {Button} from "antd";
const LoginPage:FC = () => {
    return(
        <StyledLoginPage>
            <Button onClick={()=>history.replace("/auth/accounts")} type={"text"} shape={"circle"} icon={<Icon icon={"ion:md-arrow-round-back"} className={"anticon"}/>} />
            <LoginForm />
        </StyledLoginPage>
    )
}
const StyledLoginPage = styled.div`
  width: 340px;
  min-height: 385px;
`
export default LoginPage
