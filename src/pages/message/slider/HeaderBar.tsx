import React, {FC} from "react";
import {styled} from "umi";
import {Button, Dropdown, MenuProps, Space} from "antd";
import {ConversationMode} from "@/types/message/Conversation";
import {useMessageStore} from "@/stores/messageStore";
import {shallow} from "zustand/shallow";
import {SettingOutlined} from "@ant-design/icons";

const HeaderBar:FC = () => {
    const mode = useMessageStore(state => state.mode,shallow)
    const modeMap = {
        [ConversationMode.all]:"全部",
        [ConversationMode.unRead]:"未读",
        [ConversationMode.atMe]:"@我",
        [ConversationMode.group]:"群组",
        [ConversationMode.care]:"关心"
    }
    const items:MenuProps['items']=[
        {
            key:ConversationMode.all,
            label:modeMap[ConversationMode.all],
        },
        {
            key:ConversationMode.unRead,
            label:modeMap[ConversationMode.unRead],
        },
        {
            key:ConversationMode.atMe,
            label:modeMap[ConversationMode.atMe],
        },
        {
            key:ConversationMode.group,
            label:modeMap[ConversationMode.group],
        },
        {
            key:ConversationMode.care,
            label:modeMap[ConversationMode.care],
        },
    ]
    return(
        <StyledHeaderBar>
            <Space size={2}>
                <Dropdown menu={{
                    items,
                    selectedKeys:[mode],
                    onClick:({key})=>{
                        useMessageStore.setState({
                            mode:key as ConversationMode
                        })
                    }
                }}>
                    <Button size={"small"} type={"text"} icon={<SettingOutlined/>} />
                </Dropdown>
                <Button size={"small"} type={"text"} >{modeMap[mode]}</Button>
            </Space>
        </StyledHeaderBar>
    )
}
const StyledHeaderBar = styled.div`
  padding: 5px;
`
export default HeaderBar
