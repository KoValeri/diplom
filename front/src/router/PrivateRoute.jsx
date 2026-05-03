import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../configs/routesConfig"

export default function PrivateRoute({ children, role }) {
    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />
    }

    if (role && user?.role !== role) {
        return <Navigate to={ROUTES.HOME} replace />
    }

    return children
}