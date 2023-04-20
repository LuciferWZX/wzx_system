import {useLayoutEffect} from "react";
import hotkeys from "hotkeys-js";

const useHotkeys=(enable:boolean,config?:{
    sendMsg?:()=>Promise<void>,
})=>{
    const SEND_MSG = "shift+enter"
    const AT = "shift+2"
    useLayoutEffect(()=>{
        hotkeys.filter = (event)=>{
            const target = event.target
            return (target as HTMLDivElement).isContentEditable
        }
        hotkeys(SEND_MSG,(keyboardEvent, hotkeysEvent)=>{
           if (enable){
               console.log("按下了",SEND_MSG)
               config?.sendMsg?.()
           }
        })
        // hotkeys(AT,(keyboardEvent, hotkeysEvent)=>{
        //    if (enable){
        //        console.log("按下了",AT)
        //        config?.atUser?.()
        //    }
        // })
        return ()=>{
            hotkeys.unbind(SEND_MSG)
        }
    },[enable])
}
export default useHotkeys
