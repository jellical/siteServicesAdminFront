import React, {
    Suspense,
    Fragment,
    lazy
} from 'react';
import {
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout'
import MainLayout from './layouts/MainLayout'
import HomeView from './views/home/HomeView'
import LoadingFallback from './components/LoadingFallback'
import AuthGuard from './components/AuthGuard'
import GuestGuard from './components/GuestGuard'

export const renderRoutes = (routes:any = []) => (
    <Suspense fallback={<LoadingFallback />}>
        <Switch>
            {routes.map((route:any, i:number) => {
                const Guard = route.guard || Fragment
                const Layout = route.layout || Fragment
                const Component = route.component

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>
                                    {route.routes
                                        ? renderRoutes(route.routes)
                                        : <Component {...props} />}
                                </Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);

const routes = [
    {
        exact: true,
        path: '/404',
        component: lazy(() => import('./views/errors/404'))
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/signin',
        component: lazy(() => import('./views/auth/SignIn'))
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/signup',
        component: lazy(() => import('./views/auth/SignUp'))
    },
    {
        path: '/admin',
        guard: AuthGuard,
        layout: DashboardLayout,
        routes: [
            {
                exact: true,
                path: '/admin/profile',
                component: lazy(() => import('./views/profile/ProfileView'))
            },
            {
                exact: true,
                path: '/admin',
                component: () => <Redirect to="/admin/profile" />
            },
            {
                component: () => <Redirect to="/404" />
            }
        ]
    },
    {
        path: '/websites',
        guard: AuthGuard,
        layout: DashboardLayout,
        routes: [
            {
                exact: true,
                path: '/websites',
                component: lazy(() => import('./views/website/ListView'))
            },
            {
                component: () => <Redirect to="/404" />
            }
        ]
    },
    {
        path: '*',
        layout: MainLayout,
        routes: [
            {
                exact: true,
                path: '/',
                component: HomeView
            },
            {
                component: () => <Redirect to="/404" />
            }
        ]
    }
];


export default routes;