import {FC} from "react";

import styled from "styled-components";
import LoginForm from "@/pages/auth/login/LoginForm";

const LoginPage:FC = () => {
    return(
        <StyledLoginPage>
            <LoginForm />
        </StyledLoginPage>
    )
}
const StyledLoginPage = styled.div`
  width: 340px;
`
export default LoginPage
