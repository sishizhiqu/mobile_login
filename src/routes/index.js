//路由配置文件，项目所有路由都在此配置

import Login from '../pages/Login'
import UserCenter from '../pages/UserCenter'
import NotFound from '../pages/NotFound'


const otherRoutes = [
    {
        path: '/404',
        element: <NotFound />
    },
    {
        from: '*',
        to: '/404'
    }
]
const pageRoutes = [
    {
        path: '/login',
        element: <Login />

    },
    {
        path: '/usercenter',
        element: <UserCenter />
    }
]
export {otherRoutes,pageRoutes}