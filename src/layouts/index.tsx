import React, {FC} from "react";
import { Outlet,styled } from 'umi';
import {message, Modal, notification} from "antd";
import {MessageInstance} from "antd/es/message/interface";
import {NotificationInstance} from "antd/es/notification/interface";
import {ModalStaticFunctions} from "antd/es/modal/confirm";
import useWebsocket from "@/layouts/hooks/useWebsocket";
import {Socket} from "socket.io-client";

export type OutletProps= {
    message:MessageInstance
    notification:NotificationInstance
    modal:ModalStaticFunctions
}
const Layout:FC=()=> {
    const [messageApi, contextHolder] = message.useMessage();
    const [notificationApi, nContextHolder] = notification.useNotification();
    const [modalApi, mContextHolder] = Modal.useModal();
    useWebsocket(messageApi)

  return (
    <StyledLayout>
        {contextHolder}
        {nContextHolder}
        {mContextHolder}
        <Outlet
            context={{
                message:messageApi,
                notification:notificationApi,
                modal:modalApi,
        } as OutletProps}/>
    </StyledLayout>
  );
}
const StyledLayout = styled.div`
  height: 100%;
  width: 100%;
`
export default Layout
