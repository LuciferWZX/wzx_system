import {FC} from "react";
import {styled,Icon,history} from "umi";
import LoginForm from "@/pages/auth/login/LoginForm";
import {Button} from "antd";
import {motion} from "framer-motion";
import useAccounts from "@/pages/auth/login/hooks/useAccounts";
const LoginPage:FC = () => {
    const {accounts}=useAccounts()
    return(
        <StyledLoginPage
            key="login_page"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 , transition: { duration: 0.5 }}}
            exit={{ x: -20, opacity: 0 }}>
            {accounts.length>0 && <Button onClick={()=>history.replace("/auth/accounts")} type={"text"} shape={"circle"} icon={<Icon icon={"ion:md-arrow-round-back"} className={"anticon"}/>} />}
            <LoginForm />
        </StyledLoginPage>
    )
}
const StyledLoginPage = styled(motion.div)`
  width: 340px;
  min-height: 385px;
`
export default LoginPage
