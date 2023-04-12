import React, {FC, useState} from "react";
import {Input, Modal} from "antd";
import {Icon, styled} from "umi";
import {useContactStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {useRequest} from "ahooks";
import {queryUsers} from "@/services/api/user";
import useQueryUsers from "@/modals/addContact/hooks/useQueryUsers";
import UserList from "@/modals/addContact/UserList";
import {ContactUser} from "@/types/User";
import {ResCode} from "@/types/APIResponseType";

const AddContactModal:FC = () => {
    const visible = useContactStore(state => state.addContactVisible,shallow)
    const [users, setUsers] = useState<ContactUser[]>([]);
    const {run,loading}=useQueryUsers()
    const changeQueryStr=async (queryStr:string)=>{
        const data = await run({queryStr})
        if (data.code === ResCode.success){
            setUsers(data.data)
        }
    }
    const afterClose=()=>{
        setUsers([])
    }
    const onCancel=()=>{
        useContactStore.setState({
            addContactVisible:false
        })
    }
    return(
        <Modal
            closeIcon={<Icon icon={"material-symbols:close-rounded"} className={"anticon"} />}
            open={visible}
            destroyOnClose={true}
            afterClose={afterClose}
            onCancel={onCancel}
            title={"添加好友"}>
            <StyledActionHeader>
                <Input onChange={(e)=>changeQueryStr(e.target.value)} placeholder={"请输入 昵称/用户名/邮箱/手机号码/dm"} allowClear={true} />
            </StyledActionHeader>
            <UserList loading={loading} users={users} />
        </Modal>
    )
}
export default AddContactModal
const StyledActionHeader = styled.div`
    margin-bottom: 10px;
`
