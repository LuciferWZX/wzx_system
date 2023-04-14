import React, {FC, Fragment, useLayoutEffect, useState} from "react";
import {Icon, styled} from "umi";
import {Avatar, Badge, Button, Collapse, Space, Tag, theme, Typography} from "antd";
import {useContactStore, useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {CaretRightOutlined, CheckOutlined, LoadingOutlined} from "@ant-design/icons";
import {RecordStatus, RequestRecord, User} from "@/types/User";
import {MacScrollbar} from "mac-scrollbar";

const { Panel } = Collapse;
const {Text,Paragraph}=Typography
const {useToken}=theme
const ContactList:FC = () => {
    const groups=useUserStore(state => state.contactGroups,shallow)
    const {unHandleRequestNum}=useContactStore(state => ({
        unHandleRequestNum:state.unHandleRequestNum
    }),shallow)
    return(
        <StyledContactList>
            <Collapse
                className={'collapse-container'}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                expandIconPosition={"end"}
            >
                <Panel header="新朋友" key="request" extra={<Badge count={unHandleRequestNum} />}>
                    <NewFriendsPanel />
                </Panel>
                {groups.map(group=>{
                    return (
                        <Panel
                            key={group.id}
                            header={group.label}>
                            <p>xxx</p>
                        </Panel>
                    )
                })}
            </Collapse>
        </StyledContactList>
    )
}
const StyledContactList = styled(MacScrollbar)`
  flex: 1;
  .collapse-container{
    border-radius: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
  }
  .ant-collapse-item{
    border-radius: 0!important;
  }
  .ant-collapse-content-box{
    padding: 5px!important;
  }
`
export default ContactList
const NewFriendsPanel:FC = () => {
    const {records}=useUserStore(state => ({
        records:state.requestRecords
    }),shallow)
  return(
      <div>
          {records.map(record=>{
              return(
                  <NewFriendsListItem record={record} key={record.id} />
              )
          })}
      </div>
  )
}
type NewFriendsListItemType = {
    record:RequestRecord
}
const NewFriendsListItem:FC<NewFriendsListItemType> = ({record})=>{
    const {token:{
        controlItemBgActive,//选中的背景颜色
        controlItemBgHover,//hover的背景颜色
        controlItemBgActiveHover,//已经选中了的hover颜色
    }}=useToken()
    const [friend,setFriendInfo]=useState<User|null>(null)
    const [iAmSender, setIAmSender] = useState<boolean>(false)
    const uid = useUserStore(state => state.user?.id,shallow)
    const selectId = useContactStore(state => state.selectId,shallow)

    useLayoutEffect(()=>{
        if (record.uid === uid){
            //我是发送者
            setFriendInfo(record.rProfile)
            setIAmSender(true)
            return
        }
        if(record.fid === uid){
            //我是接受着
            setFriendInfo(record.sProfile)
            setIAmSender(false)
            return;
        }
        throw Error("[该条数据异常]")
    },[])

    const renderActions=()=>{
        if (iAmSender){
            if (record.status === RecordStatus.Waiting){
                return <Text type={"secondary"} strong={true}><LoadingOutlined/> 处理中</Text>
            }

        }
        return(
            <Fragment>
                <Button size={"small"} type={"text"} danger={true} icon={<Icon icon={"ep:close-bold"} className={"anticon"} />} />
                <Button size={"small"} type={"primary"} icon={<CheckOutlined />} />
            </Fragment>
        );
    }
    const selectRecordItem=()=>{
        useContactStore.setState({
            selectId:record.id,
            selectType:"request"
        })
    }
    return(
        <StyledFriendsListItem
            onClick={selectRecordItem}
            $selectedBgColor={selectId===record.id?controlItemBgActive:"unset"}
            $hoverBgColor={selectId===record.id?controlItemBgActiveHover:controlItemBgHover}>
            <Avatar size={50} src={friend?.avatar} />
            <div className={'item-info'}>
                <div>
                    <Text style={{fontSize:16}} strong={true}>{friend?.nickname}</Text>
                </div>
                {(iAmSender && record.senderRemark)?<Tag bordered={false} color="blue">{record.senderRemark}</Tag>:""}
                <div>
                     {record.senderDesc?<Paragraph ellipsis={{rows:2}} style={{marginBottom:0}}>{iAmSender?"我":"对方"}:{record.senderDesc}</Paragraph>:<Text type={"secondary"}>暂无说明</Text>}
                </div>
            </div>
            <Space direction={"horizontal"}>
                {renderActions()}
            </Space>
        </StyledFriendsListItem>
    )
}
const StyledFriendsListItem = styled.div<{$hoverBgColor:string,$selectedBgColor:string}>`
    display: flex;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  background-color: ${({$selectedBgColor})=>$selectedBgColor};
  transition-property: background-color;
  transition-duration: 0.3s;
  &:hover{
    background-color:${({$hoverBgColor})=>$hoverBgColor}};
  }
  .item-info{
    margin: 0 10px;
    flex: 1;
  }
`

