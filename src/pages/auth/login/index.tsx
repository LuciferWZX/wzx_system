import {FC, useEffect, useLayoutEffect, useState} from "react";

import {styled} from "umi";
import LoginForm from "@/pages/auth/login/LoginForm";
import useAccounts from "@/pages/auth/login/hooks/useAccounts";
import AccountForm from "@/pages/auth/login/AccountForm";

const LoginPage:FC = () => {
    const [currentType, setCurrentType] = useState<"accounts"|"login">("accounts");
    const {accounts,isOk}=useAccounts()
    useLayoutEffect(()=>{
        if (isOk){
            setCurrentType(accounts.length>0?"accounts":"login")
        }
    },[isOk])
    if (!isOk){
        return (
            <StyledLoginPage>
                Loading...
            </StyledLoginPage>
        )
    }
    return(
        <StyledLoginPage>
            {accounts.length>0?<AccountForm accounts={accounts}/>:<LoginForm />}

        </StyledLoginPage>
    )
}
const StyledLoginPage = styled.div`
  width: 340px;
  min-height: 385px;
`
export default LoginPage
