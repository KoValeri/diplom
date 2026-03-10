import AppRouter from "./router/AppRouter.jsx";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "./store/authSlice.js"
import { tokenURL } from "./configs/tokenUrlConfig.js";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(tokenURL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      dispatch(authActions.setUser(user));
    });
  }, []);

  return (
    <AppRouter />
  );
}

export default App;