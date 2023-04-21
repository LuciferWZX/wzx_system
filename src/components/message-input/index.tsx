import React, {FC} from "react";
import {Mentions} from "antd";
import {styled} from "umi";

const MessageInput:FC = () => {
    return(
        <StyledMessageInput>
            <Mentions
                rows={3}
                placeholder="You can use @ to ref user here"
                options={[
                    {
                        value: 'afc163',
                        label: 'afc163',
                    },
                    {
                        value: 'zombieJ',
                        label: 'zombieJ',
                    },
                    {
                        value: 'yesmeck',
                        label: 'yesmeck',
                    },
                ]}
            />
        </StyledMessageInput>
    )
}
const StyledMessageInput = styled.div`
`
export default MessageInput
