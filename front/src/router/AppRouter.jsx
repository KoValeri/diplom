import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import { ROUTES } from '../configs/routesConfig'
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: ROUTES.HOME, element: <HomePage /> },
        ]
    }
]);

export default function AppRouter(){
    return <RouterProvider router={router} />;
}