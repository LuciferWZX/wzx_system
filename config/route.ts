

const routes:any[]=[
    {
        path: '/auth',
        component: '@/layouts/auth',
        routes: [
            { path: '/auth',redirect:'/auth/login'},
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
            { path: '/',redirect:'/home'},
            {
                path: '/home',//首页
                component: 'home' ,
            },
        ],
    },
    {path: "*",component: "404"}
]
export default routes
