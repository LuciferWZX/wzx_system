import React, {FC} from "react";
import { Outlet,styled,useLocation } from 'umi';

const Layout:FC=()=> {
  return (
    <StyledLayout>
        <Outlet/>
    </StyledLayout>
  );
}
const StyledLayout = styled.div`
  height: 100%;
  width: 100%;
`
export default Layout
