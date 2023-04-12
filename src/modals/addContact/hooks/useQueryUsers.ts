import {useRequest} from "ahooks";
import {queryUsers} from "@/services/api/user";

const useQueryUsers = () => {
    const {runAsync:runQuery,loading,data}=useRequest(queryUsers,{
        manual:true,
        debounceWait:300
    })
    return {
        run:runQuery,
        loading,
        data
    }
}
export default useQueryUsers
