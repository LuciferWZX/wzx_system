import {extend, ResponseError} from "umi-request";
import userStore from "@/stores/user.store";
const codeMap = {
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
}
const errorHandler=(err:ResponseError)=>{
    if (err.response) {
        if (typeof err.data === "string"){
            //说明是其他问题导致
            return {
                code:-1,
                message:codeMap[err.response.status]
            }
        }
        //说明掉接口导致
        return err.data
    } else {
        console.log(err.response);
        console.log(err.message);
    }
    throw err; //
}
const request = extend({
    credentials:"omit",
    timeout:60000,
    cache:"no-cache",
    errorHandler
})
request.interceptors.request.use((url, options) => {
    let header:any = options.headers
    if (userStore.state.token && !header.Authorization){
        console.log(!header.Authorization)
        header.Authorization = `Bearer ${userStore.state.token}`
    }
    return {
        url: url,
        options: {
            ...options,
            headers: header,
        },
    };
});
request.interceptors.response.use(async (response,options)=>{
    // const url:string = options.url;
    return response
})
export default request
