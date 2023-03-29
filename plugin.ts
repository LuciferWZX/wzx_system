import {IApi} from "umi";

export default (api:IApi)=>{
    api.onDevCompileDone(opts=>{
        const {time,isFirstCompile}=opts
        console.log(`[${isFirstCompile?"首次":""}DEV模式编译完成]:`,time);
    });
    api.onBuildComplete((opts) => {
        const {time,isFirstCompile}=opts

        console.log(`[${isFirstCompile?"首次":""}打包完成]:`,time);
    });
    api.onStart(() => {
        console.log('[启动]');
    });
}
