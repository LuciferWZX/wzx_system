import {FC} from "react";
import {WangInput} from "@/components";
import {useUserStore} from "@/stores";

const FriendContent:FC = () => {
    const {contacts} = useUserStore(state => ({
        contacts:state.contacts
    }))
    return(
        <div>
            friendContent
            <WangInput recommends={contacts} />
        </div>
    )
}
export default FriendContent
