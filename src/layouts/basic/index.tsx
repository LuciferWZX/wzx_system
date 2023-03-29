import {FC} from "react"
import {Outlet} from "umi";
const BasicLayout:FC = () => {
    return(
            <div>
                BasicLayout
                <Outlet/>
            </div>
    )
}
export default BasicLayout