import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authModalActions } from "../store/authModalSlice"
import { ROUTES } from "../configs/routesConfig"

export default function PrivateRoute({ children }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(authModalActions.openLogin())
            navigate(ROUTES.HOME)
        }
    }, [isAuthenticated])

    return isAuthenticated ? children : null
}