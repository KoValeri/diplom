import { authActions } from "./authSlice"
import { favoritesApi } from "../api/favoritesApi"
import { usersApi } from "../api/usersApi"
import { cartApi } from "../api/cartApi";

export const logoutAndClear = () => (dispatch) => {
  localStorage.removeItem("token")
  dispatch(authActions.logout())
  dispatch(favoritesApi.util.resetApiState())
  dispatch(usersApi.util.resetApiState())
  dispatch(cartApi.util.resetApiState());
}