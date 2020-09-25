export let routerList = [
    {
        path: "/",
        component: () => import('../components/Index'),
        children:[
            {path:"/find", name:"find", component:() => import('../components/find/Find'),isKeep: true},
            {path:"/my", name:"my", component:() => import('../components/my/My'),isKeep: true}
        ]
    },
    {
        path: "/login",
        component: () => import('../components/Login')
    },
];