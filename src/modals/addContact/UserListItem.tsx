import React, {FC, useLayoutEffect} from "react";
import {styled, useOutletContext} from "umi";
import {Avatar, Button, Descriptions, Popover, Space, Typography, theme, Form, Input, Select, Divider} from "antd";
import {ContactUser, RecordStatus} from "@/types/User";
import {Icon} from "@@/exports";
import {useContactStore, useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {useRequest} from "ahooks";
import {ResCode} from "@/types/APIResponseType";
import {OutletProps} from "@/layouts";
import {LoadingOutlined} from "@ant-design/icons";
const {Text}=Typography
const {useToken}=theme
type ItemType = {
    avatar?:string
    title?:React.ReactNode
    content?:React.ReactNode
    className?:string
    user:ContactUser
}
const UserListItem:FC<ItemType> = (props) => {
    const {avatar,title,content,className,user}=props
    const {records,uId}=useUserStore(state => ({
        records:state.requestRecords,
        uId:state.user.id
    }),shallow)
    const checkDetail=()=>{
        useContactStore.setState({
            addFriendsDetailVisible:true,
            curUserDetail:user
        })
    }
    const renderActionButton=()=>{
        //我是发送者
        const sRecord = records.find(_record=>_record.uid === uId && _record.fid ===user.id)
        //该记录存在
        if (sRecord){
            //已接受
            if (sRecord.status === RecordStatus.Accept){
                //是好友
                return <Text style={{color:"#52c41a"}}>你们已经是好友了</Text>
            }
            if (sRecord.status === RecordStatus.Waiting){
                return <Text strong={true} type={"secondary"}><LoadingOutlined /> 等待对方处理</Text>
            }
        }
        //我是接收者
        const rRecord = records.find(_record=>_record.fid === uId && _record.uid ===user.id)
        //该记录存在
        if (rRecord){
            //已接受
            if (rRecord.status === RecordStatus.Accept){
                //是好友
                return <Text style={{color:"#52c41a"}}>你们已经是好友了</Text>
            }
            if (rRecord.status === RecordStatus.Waiting){
                return <Text type={"secondary"} strong={true}>对方已发送请求</Text>
            }
        }
        return  <Button type={"primary"} onClick={checkDetail}>添加</Button>
    }
    return(
        <StyledUserListItem className={className}>
            <Avatar size={46} src={avatar} />
            <div className={'content'}>
                <Text strong={true} className={'title'}>{title}</Text>
                <Text className={'second-content'} type={"secondary"}>{content}</Text>
            </div>
            <div className={"actions"}>
                {renderActionButton()}

            </div>
        </StyledUserListItem>
    )
}
type UserFormType = {
    user:ContactUser
}
type FormType = {
    senderDesc:string
    senderRemark:string
    uGroupId:number
}
const StyledUserListItem = styled.div`
  display: flex;
  align-items: center;
  .content{
    flex: 1;
    margin:auto 10px;
    .title{
      display: block;
      font-size: 16px;
    }
    .second-content{
      display: block;
    }
  }
`
export default UserListItem
