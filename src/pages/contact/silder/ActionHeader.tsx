import {FC} from "react";
import {styled} from "umi";
import {Button, Dropdown, Input, MenuProps} from "antd";
import {MoreOutlined} from "@ant-design/icons";
import {shallow} from "zustand/shallow";
import {useContactStore} from "@/stores";

const ActionHeader:FC = () => {
    const {filter}=useContactStore(state => ({filter:state.filterStr}),shallow)
    const items: MenuProps['items'] = [
        {
            key:"add",
            label:"添加好友",
            onClick:()=>{
               useContactStore.setState({
                   addContactVisible:true
               })
            }
        }
    ]
    const onChange=(val:string)=>{
        useContactStore.setState({
            filterStr:val
        })
    }
    return (
        <StyledActionHeader>
            <Input value={filter} onChange={(e)=>onChange(e.target.value)} placeholder={"搜索"} className={"search-input"} allowClear={true} />
            <Dropdown
                trigger={["click"]}
                menu={{items}}>
                <Button type={"text"} icon={<MoreOutlined />} />
            </Dropdown>
        </StyledActionHeader>
    )
}
export default ActionHeader
const StyledActionHeader = styled.div`
    padding: 10px;
    display: flex;
  .search-input{
    margin-right: 10px;
  }
`
