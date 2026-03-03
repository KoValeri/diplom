import { useDispatch, useSelector } from "react-redux"
import { authModalActions } from "../../store/authModalSlice"
import styles from "./AuthModal.module.css"

function AuthModal() {
  const dispatch = useDispatch()
  const { isOpen, mode } = useSelector(state => state.authModal)

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <button
          className={styles.close}
          onClick={() => dispatch(authModalActions.closeModal())}
        >
          ✖
        </button>

        <h2>
          {mode === "login" ? "Вход" : "Регистрация"}
        </h2>

        <form>
          <input placeholder="Email" />
          <input type="password" placeholder="Пароль" />

          <button type="submit">
            {mode === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>

        {mode === "login" ? (
          <p>
            Нет аккаунта?
            <span
              onClick={() =>
                dispatch(authModalActions.openRegister())
              }
            >
              {" "}Регистрация
            </span>
          </p>
        ) : (
          <p>
            Уже есть аккаунт?
            <span
              onClick={() =>
                dispatch(authModalActions.openLogin())
              }
            >
              {" "}Войти
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default AuthModal