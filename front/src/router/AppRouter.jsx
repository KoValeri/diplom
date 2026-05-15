import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import RootLayout from '../pages/RootLayout'
import { ROUTES } from '../configs/routesConfig'
import PrivateRoute from './PrivateRoute'

import HomePage from '../pages/Home/HomePage';
const BestelleersPage = lazy(() => import('../pages/BestsellersPage'))
const NewBooksPage = lazy(() => import('../pages/NewBooksPage'));
const BookDetailsPage = lazy(() => import('../pages/BookDetailsPage'));
const DiscountsPage = lazy(() => import('../pages/DiscountsPage'));
const AboutUsPage = lazy(() => import('../pages/AboutUs/AboutUsPage'));
const BookSeriesPage = lazy(() => import('../pages/BookSeriesPage'));
const BooksByCategoryPage = lazy(() => import('../pages/BooksByCategoryPage'));
const СategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const AdminPage = lazy(() => import('../pages/Admin/AdminPage'));
const CartPage = lazy(() => import('../pages/Cart/CartPage'));
const OrdersPage = lazy(() => import('../pages/Orders/OrdersPage'));

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: ROUTES.HOME, element: <HomePage /> },
            { path: ROUTES.NEWBOOKS, element: <NewBooksPage /> },
            { path: ROUTES.BESTSELLERS, element: <BestelleersPage /> },
            { path: ROUTES.DISCOUNTS, element: <DiscountsPage /> },
            { path: ROUTES.BOOK, element: <BookDetailsPage /> },
            { path: ROUTES.ABOUTUS, element: <AboutUsPage /> },
            { path: ROUTES.SERIES, element: <BookSeriesPage /> },
            { path: ROUTES.BOOKSBYCATEGORIES, element: <BooksByCategoryPage /> },
            { path: ROUTES.CATEGORIES, element: <СategoriesPage /> },
            { path: ROUTES.SEARCH, element: <SearchPage /> },
            {
                path: ROUTES.ADMIN,
                element: (
                    <PrivateRoute role="admin">
                        <AdminPage />
                    </PrivateRoute>
                )
            },
            {
                path: ROUTES.FAVORITES,
                element: (
                    <PrivateRoute>
                        <FavoritesPage />
                    </PrivateRoute>
                )
            },
            {
                path: ROUTES.CART,
                element: (
                    <PrivateRoute>
                        <CartPage />
                    </PrivateRoute>
                )
            },
            {
                path: ROUTES.ORDERS,
                element: (
                    <PrivateRoute>
                        <OrdersPage />
                    </PrivateRoute>
                )
            },
        ]
    }
]);

export default function AppRouter(){
    return (
        <Suspense fallback={<p>Загрузка страницы...</p>}>
            <RouterProvider router={router} />
        </Suspense>
    )
}