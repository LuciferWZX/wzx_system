import 'umi/typings';
declare global {
    interface Window{
        versions:{
            node:()=>string
            chrome:()=>string
            electron:()=>string
        }
    }
}
