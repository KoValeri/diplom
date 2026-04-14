import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import { ROUTES } from '../configs/routesConfig'
import HomePage from '../pages/Home/HomePage';
import BestelleersPage from '../pages/BestsellersPage';
import NewBooksPage from '../pages/NewBooksPage';
import BookDetailsPage from '../pages/BookDetailsPage';
import DiscountsPage from '../pages/DiscountsPage';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';
import BookSeriesPage from '../pages/BookSeriesPage';
import BooksByCategoryPage from '../pages/BooksByCategoryPage';
import СategoriesPage from '../pages/CategoriesPage'
import SearchPage from '../pages/SearchPage'
import FavoritesPage from '../pages/FavoritesPage';
import PrivateRoute from './PrivateRoute';

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
                path: ROUTES.FAVORITES,
                element: (
                <PrivateRoute>
                    <FavoritesPage />
                </PrivateRoute>
                )
            },
        ]
    }
]);

export default function AppRouter(){
    return <RouterProvider router={router} />;
}