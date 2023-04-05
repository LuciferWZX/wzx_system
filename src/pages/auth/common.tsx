import {NotificationInstance} from "antd/es/notification/interface";
import {Avatar, Space,Typography} from "antd";
import React from "react";
import {User} from "@/types/User";
import {Icon} from "umi";

export const showLoginNotification = (notification:NotificationInstance,user:User) => {
    const {Text} = Typography
    notification.success({
        icon:<Avatar shape={"square"} src={user.avatar} size={55} />,
        key:"login-success",
        closeIcon:<Icon icon={"material-symbols:close-rounded"} className={"anticon"} />,
        message: "登录成功",
        placement:'topLeft',
        className:"login-success-notification",
        description:<Space><Text strong={true}>{user.nickname}</Text>欢迎回来~ 🎉🎉🎉</Space>,
        duration:3
    })
}
