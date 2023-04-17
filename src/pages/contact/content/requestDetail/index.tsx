import React, {FC, useEffect} from "react";
import {styled, useOutletContext} from "umi";
import {useRequestRecord} from "@/pages/contact/content/contactDetail/useRequestRecord";
import {Button, Form, Input, Select, Space, theme, Typography} from "antd";
import BasicInfo from "@/pages/contact/content/BasicInfo";
import {useContactStore, useUserStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {Icon} from "@@/exports";
import {RecordStatus} from "@/types/User";
import {LoadingOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import {OutletProps} from "@/layouts";

const {Text,Link}=Typography
const {useToken}=theme
const RequestDetailPage:FC = () => {
    const [form]=Form.useForm()
    const {record,recordUser}=useRequestRecord()
    const {groups}=useUserStore(state => ({
        groups:state.contactGroups
    }),shallow)
    const {token:{colorPrimary,colorSuccess,colorError}}=useToken()
    const {modal}=useOutletContext<OutletProps>()
    const {run:handleRecordStatus,loading:handleRecordLoading}=useRequest(useContactStore.getState().changeRecordStatus,{
        manual:true
    })
    useEffect(()=>{
        if (record){
            form.setFieldsValue({
                groupId:record.groupId,
                rejectReason:record.rejectReason
            })
        }
    },[record?.id])
    const accept=async ()=>{
        const groupId:number = form.getFieldValue("groupId")
        await handleRecordStatus({
            groupId: groupId,
            recordId: record.id,
            status: RecordStatus.Accept,
        })
    }
    const openConfirm=()=>{
        modal.confirm({
            title:"拒绝",
            content:<span>你确定要拒绝 <Link>{recordUser.nickname}</Link> 请求吗?</span>,
            onOk:reject,
            okButtonProps:{
                danger:true
            },
            okText:"确定"
        })
    }
    const reject=async ()=>{
        const {groupId,rejectReason} = form.getFieldsValue(["groupId","rejectReason"])
        await handleRecordStatus({
            groupId: groupId,
            recordId: record.id,
            status: RecordStatus.Reject,
            rejectReason:rejectReason
        })
    }
    if (!recordUser){
        return (
            <div>loading</div>
        )
    }
    const renderFooter=()=>{
        let text = ""

        if (record.status === RecordStatus.Accept){
            text = record.creatorId === record.fid?"对方已同意":"已同意"
            return <Text strong={true} style={{color:colorSuccess}}>{text}</Text>
        }
        if (record.status === RecordStatus.Reject){
            text = record.creatorId === record.fid?"对方已拒绝":"已拒绝"
            return <Text strong={true} style={{color:colorError}}>{text}</Text>
        }
        if (record.status === RecordStatus.Waiting){
            if (record.creatorId !== record.fid){
                return <Text strong={true} type={"secondary"}><LoadingOutlined /> 等待对方处理</Text>
            }
            return  (
                <Space>
                    <Button disabled={handleRecordLoading} onClick={openConfirm} type={"text"} danger={true} >拒绝</Button>
                    <Button disabled={handleRecordLoading} type={"primary"} onClick={accept}>接受</Button>
                </Space>
            )
        }
    }
    return(
        <StyledRequestDetailPage>
            <Space direction={"vertical"} style={{width:"100%"}}>
                <Form
                    form={form}
                    disabled={handleRecordLoading||record.status !== RecordStatus.Waiting||record.creatorId !== record.fid}>
                    <BasicInfo
                        user={recordUser}
                        extendData={[
                            {
                                id:"senderDesc",
                                label:record.creatorId!==record.fid?"我":"对方",
                                value:record?.senderDesc?record.senderDesc:<Text type={"secondary"}>暂无~</Text>
                            },
                            record.status!==RecordStatus.Reject && {
                                id:"group",
                                label:"分组",
                                value:(
                                    <Form.Item name={"groupId"} noStyle={true}>
                                        <Select
                                            suffixIcon={<Icon icon={"ic:round-keyboard-arrow-down"} className={"anticon"} style={{fontSize:19}} />}
                                            placeholder={"请选择"}
                                            style={{width:"100%"}}>
                                            {groups.map(group=>{
                                                return (
                                                    <Select.Option key={group.id} value={group.id}>
                                                        {group.label}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                )
                            },
                            record.status!==RecordStatus.Accept&&record.creatorId === record.fid&&{
                                id:"reject",
                                label:"拒绝说明",
                                value:(
                                    <Form.Item name={"rejectReason"} noStyle={true}>
                                        <Input.TextArea placeholder={"原因~"} autoSize={{ minRows: 3, maxRows: 3 }} maxLength={50} />
                                    </Form.Item>
                                )
                            }
                        ]}
                    />
                    <div className={'action-footer'}>
                        {renderFooter()}
                    </div>
                </Form>
            </Space>
        </StyledRequestDetailPage>
    )
}
export default RequestDetailPage
const StyledRequestDetailPage = styled.div`
  padding: 20px;
  overflow: auto;
    display: flex;
    align-items: center;
  justify-content: center;
  .action-footer{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

`
