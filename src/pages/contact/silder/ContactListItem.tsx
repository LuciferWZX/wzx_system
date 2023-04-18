import React, {FC} from "react";
import {styled,Icon} from "umi";
import {Avatar, Space, Tag, theme, Tooltip, Typography} from "antd";
import {Contact} from "@/types/friends/Contact";
import {useContactStore} from "@/stores";
import {shallow} from "zustand/shallow";
import {GenderType} from "@/types/User";

const {useToken}=theme
const {Text}=Typography
type ContactItem = {
    contact:Contact
    className?:string
}
const ContactListItem:FC<ContactItem> = (props) => {
    const {contact,className}=props
    const {friendInfo}=contact
    const selectId = useContactStore(state => state.selectId,shallow)
    const {token:{
        controlItemBgActive,//选中的背景颜色
        controlItemBgHover,//hover的背景颜色
        controlItemBgActiveHover,//已经选中了的hover颜色
    }}=useToken()
    const selectRecordItem=()=>{
        useContactStore.setState({
            selectId:contact.id,
            selectType:"contact"
        })
    }
    return(
        <StyledContactListItem
            className={className}
            onClick={selectRecordItem}
            $selectedBgColor={selectId===contact.id?controlItemBgActive:"unset"}
            $hoverBgColor={selectId===contact.id?controlItemBgActiveHover:controlItemBgHover}>
            <Avatar size={50} src={friendInfo?.avatar} />
            <div className={'item-info'}>
                <div className={'nickname-div'}>
                    <Text style={{fontSize:16,flex:1}} strong={true}>{friendInfo?.nickname}</Text>
                    <Tag color={friendInfo.gender === GenderType.female?"red":"blue"} bordered={false}>
                        {friendInfo.gender === GenderType.female?
                            <Icon icon={"icon-park-outline:female"} className={"anticon"}/>:
                            <Icon icon={"icon-park-outline:male"} className={"anticon"}/>
                        }
                    </Tag>
                </div>
                <Space align={"start"}>

                    <div>
                        {friendInfo.sign?<Text strong={true} style={{fontSize:12}}>{friendInfo.sign}</Text>:<Text style={{fontSize:12}} type={"secondary"} strong={true}>没有留下任何状态~</Text>}
                    </div>
                </Space>
            </div>
            {friendInfo?.ban?.banded && (
                <Tooltip placement={"right"} title={"该用户被封禁"} color={"red"}>
                    <Icon icon={"majesticons:ban"} className={"anticon icon-ban"} />
                </Tooltip>
            )}
        </StyledContactListItem>
    )
}
const StyledContactListItem = styled.div<{$hoverBgColor:string,$selectedBgColor:string}>`
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
    .nickname-div{
      display: flex;
      align-items: baseline;
    }
  }
  .icon-ban{
    color: red;
`
export default ContactListItem
