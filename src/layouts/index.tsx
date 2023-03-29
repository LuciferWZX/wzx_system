import {FC} from "react";
import { Outlet } from 'umi';
import styled from "styled-components";

const Layout:FC=()=> {
  return (
    <StyledLayout>
      <Outlet />
    </StyledLayout>
  );
}
const StyledLayout = styled.div`
  height: 100%;
  width: 100%;
`
export default Layout
