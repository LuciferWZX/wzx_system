import {IDBPDatabase, openDB} from "idb";

export class Database {
    private readonly database:Promise<IDBPDatabase<unknown>>
    constructor(dbName:string,version:number,storeNames?:string[]) {
        this.database = openDB(dbName,version,{
            upgrade:(database)=>{
                console.info("[初次打开数据库，开始初始化storeNames:]")
                for (let i=0;i<storeNames.length;i++){
                    database.createObjectStore(storeNames[i],{keyPath:'id'})
                    console.info(`[store:${storeNames[i]}]:初始化完成！`)
                }
                console.info(["已全部初始化完成"])
            },
            terminated:()=> {
                console.warn("[览器异常终止连接]")
            }
        })
    }
    async get<T>(storeName:string,key:string):Promise<T>{
        return (await this.database).get(storeName,key)
    }
    async set<T>(storeName:string,key:string,value:T){
        return (await this.database).put(storeName,value,key)
    }
    async del(storeName:string,key:string){
        return (await this.database).delete(storeName, key);
    }
    async clear(storeName:string){
        return (await this.database).clear(storeName)
    }
    async keys(storeName:string){
        return (await this.database).getAllKeys(storeName);
    }

}
