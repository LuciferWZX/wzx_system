

const routes:any[]=[
    {
        path: '/auth',
        component: '@/layouts/auth',
        routes: [
            { path: '/auth',redirect:'/auth/accounts'},
            {
                path: '/auth/accounts',//账户列表
                component: 'auth/accounts' ,
            },
            {
                path: '/auth/login',//登录
                component: 'auth/login' ,
            },
        ],
    },
    //主页的路由
    {
        path: '/',
        component: '@/layouts/basic',
        routes: [
            { path: '/',redirect:'/contact'},
            {
                path: '/message',//消息
                component: 'message' ,
            },
            {
                path: '/contact',//联系人
                component: 'contact' ,
            },
            {
                path: '/home',//首页
                component: 'home' ,
            },
        ],
    },
    {path: "*",component: "404"}
]
export default routes
