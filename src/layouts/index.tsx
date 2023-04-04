import React, {FC} from "react";
import { Outlet,styled,useLocation } from 'umi';
import {AnimatePresence} from "framer-motion";

const Layout:FC=()=> {
    const location = useLocation();
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
