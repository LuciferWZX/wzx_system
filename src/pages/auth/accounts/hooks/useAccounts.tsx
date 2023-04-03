import {useLayoutEffect, useState} from "react";
import store from "storejs";
import {StoreKey} from "@/types/StoreKey";
export type AccountCache = {id:number,avatar:string,nickname:string,token:string,error?:boolean}
const useAccounts = () => {
    const [accountsList, setAccountsList] = useState<AccountCache[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(true)
    useLayoutEffect(()=>{
        initData()
        setIsLoading(false)
    },[])
    const initData=()=>{
        const mapJsonStr = store.get(StoreKey.Accounts)
        let accountsMap:Map<number,AccountCache>
        if (mapJsonStr) {
            accountsMap = new Map(JSON.parse(mapJsonStr))
        }else{
            accountsMap = new Map()
        }
        let accounts = Array.from(accountsMap.values())
        const currentUserId = store.get(StoreKey.CurrentUserId)
        if (currentUserId){
            const cIndex = accounts.findIndex(item=>item.id === currentUserId)
            const [item]=accounts.splice(cIndex,1)
            accounts.unshift(item)
        }
        setAccountsList(accounts)
    }
    const switchAccount = (accountId:number) =>{
        if (accountId){
            let account = [...accountsList]
            const cIndex = account.findIndex(item=>item.id === accountId)
            const [item]=account.splice(cIndex,1)
            account.unshift(item)
            setAccountsList(account)
            return
        }
        throw new Error("id不存在")

    }

    const updateState = (id:number,error:boolean) =>{
        const mapJsonStr = store.get(StoreKey.Accounts)
        let accounts:Map<number,AccountCache>
        if (mapJsonStr) {
            accounts = new Map(JSON.parse(mapJsonStr))
        }else{
            accounts = new Map()
        }
        const item = accountsList.find(item=>item.id === id)
        accounts.set(item.id,{id:item.id,avatar:item.avatar,nickname:item.nickname,token:item.token,error:error})
        store.set(StoreKey.Accounts,JSON.stringify([...accounts]))
        setAccountsList(accountsList.map(account=>{
            if (account.id === id){
                return {
                    ...account,
                    error:error
                }
            }
            return account
        }))
    }
    return {
        accounts:accountsList,
        isOk:!isLoading,
        switchAccount:switchAccount,
        updateState:updateState,
    }
}
export default useAccounts
