import React, {FC} from "react";
import {styled} from "umi";
import {ContactUser} from "@/types/User";
import {Empty, Spin} from "antd";
import {MacScrollbar} from "mac-scrollbar";
import UserListItem from "@/modals/addContact/UserListItem";
type UserListType = {
    loading:boolean
    users:ContactUser[]
}
const UserList:FC<UserListType> = ({loading,users}) => {
    return(
        <Spin spinning={loading} delay={200}>
            <StyledUserList >
                {users.length === 0 ?
                    <Empty
                        className={'empty'}
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        description={""}
                        />:users.map(user=>{
                    return (
                        <UserListItem
                            className={'list-item'}
                            key={user.id}
                            avatar={user.avatar}
                            title={user.nickname}
                            content={user.email}
                            user={user}
                        />
                    )
                })}
            </StyledUserList>
        </Spin>

    )
}
export default UserList
const StyledUserList = styled(MacScrollbar)`
    height: 300px;
  .empty{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .list-item:not(:first-child){
    margin-top: 5px;
  }
`
