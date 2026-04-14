import { authActions } from "./authSlice"
import { favoritesApi } from "../api/favoritesApi"
import { usersApi } from "../api/usersApi"

export const logoutAndClear = () => (dispatch) => {
  // 1. чистим токен
  localStorage.removeItem("token")

  // 2. чистим redux auth
  dispatch(authActions.logout())

  // 3. ЧИСТИМ ВСЕ RTK QUERY КЕШИ
  dispatch(favoritesApi.util.resetApiState())
  dispatch(usersApi.util.resetApiState())
}