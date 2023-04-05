import {FC} from "react";
import {styled} from "umi";
import LoginForm from "@/pages/auth/login/LoginForm";
import {motion} from "framer-motion";
const LoginPage:FC = () => {

    return(
        <StyledLoginPage
            key="login_page"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 , transition: { duration: 0.5 }}}
            exit={{ x: -20, opacity: 0 }}>

            <LoginForm />
        </StyledLoginPage>
    )
}
const StyledLoginPage = styled(motion.div)`
  width: 340px;
  min-height: 385px;
`
export default LoginPage
