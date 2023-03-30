export type APIResponseType<T> = {
    code:ResCode
    data:T
    message:string
}
export enum ResCode {
    success,
    failed
}
