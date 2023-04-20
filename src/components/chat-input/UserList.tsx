import {FC} from "react";
import {styled} from "umi";

interface IProps{
    id?:string
}
const UserList:FC<IProps> = (props) => {
    const {id}=props
    return(
        <StyledUserList id={id}>

        </StyledUserList>
    )
}
const StyledUserList = styled.div`
    position: absolute;
      top: 0;
      left: 0;
    background-color: orange;
    width: 400px;
    height: 400px;
    display: none;
`
export default UserList
