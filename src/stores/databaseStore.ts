import {Database} from "@/idb/Database";
import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";
import db_config from "@/idb/dbConfig.json"
type DatabaseStoreType={
    database:Database
}
type Action={}
const {dbName,version,storeNames} =db_config
const initialState:DatabaseStoreType={
    database:new Database(dbName,version,storeNames)
}
export const useDBStore=create(
    subscribeWithSelector<DatabaseStoreType & Action>(
        (set,get)=>({
            ...initialState
        })
    )
)
