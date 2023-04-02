import {useLayoutEffect, useState} from "react";
import store from "storejs";
import {StoreKey} from "@/types/StoreKey";
export type AccountCache = {id:number,avatar:string,nickname:string}
const useAccounts = () => {
    const [accountsList, setAccountsList] = useState<AccountCache[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(true)
    useLayoutEffect(()=>{
        const mapJsonStr = store.get(StoreKey.Accounts)
        let accountsMap:Map<number,AccountCache>
        if (mapJsonStr) {
            accountsMap = new Map(JSON.parse(mapJsonStr))
        }else{
            accountsMap = new Map()
        }
        let accounts = Array.from(accountsMap.values())
        setAccountsList(accounts)
        setIsLoading(false)
    },[])
    return {
        accounts:accountsList,
        isOk:!isLoading
    }
}
export default useAccounts
