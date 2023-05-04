import 'umi/typings';
import {WindowActionType} from "@/types/electron/WindowActionType";
declare global {
    interface Window{
        versions:{
            node:()=>string
            chrome:()=>string
            electron:()=>string
        },
        actions:{
            handleMainWin:(action:WindowActionType)=>void
        }
    }
}
