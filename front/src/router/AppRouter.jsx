import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import { ROUTES } from '../configs/routesConfig'
import HomePage from '../pages/Home/HomePage';
import BestelleersPage from '../pages/BestsellersPage';
import NewBooksPage from '../pages/NewBooksPage';
import BookDetailsPage from '../pages/BookDetailsPage';

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: ROUTES.HOME, element: <HomePage /> },
            { path: ROUTES.NEWBOOKS, element: <NewBooksPage /> },
            { path: ROUTES.BESTSELLERS, element: <BestelleersPage /> },
            { path: ROUTES.BOOK, element: <BookDetailsPage /> },
        ]
    }
]);

export default function AppRouter(){
    return <RouterProvider router={router} />;
}