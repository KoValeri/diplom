import { useDispatch, useSelector } from "react-redux"
import { authModalActions } from "../../store/authModalSlice"
import styles from "./AuthModal.module.css"

import { IoMdClose } from "react-icons/io"

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
            <IoMdClose size={17}/>
            </button>

            <form>
                {mode === 'login' ? (
                    <div className={styles.fields}>  
                        <div className={styles.inputFields}>
                            <label htmlFor="loginEmail">Логин</label>
                            <input placeholder="Введите Email" id="loginEmail"/>
                        </div>

                        <div className={styles.inputFields}>
                            <label htmlFor="loginPassword">Пароль</label>
                            <input type="password" placeholder="Пароль" id="loginPassword"/>
                        </div>

                        <button type="submit">
                            Войти
                        </button>

                        <div>
                            У вас нет аккаунта? <button>Зарегистрироваться</button>
                        </div>
                    </div>

                ) : (
                    <div className={styles.fields}>  
                        <div className={styles.inputFields}>
                            <label htmlFor="name">Имя</label>
                            <input id="name"/>
                        </div>

                        <div className={styles.inputFields}>
                            <label htmlFor="surname">Фамилия</label>
                            <input id="surname"/>
                        </div>

                        <div className={styles.inputFields}>
                            <label htmlFor="regEmail">Email</label>
                            <input id="regEmail" />
                        </div>

                        <div className={styles.inputFields}>
                            <label htmlFor="regPassword">Пароль</label>
                            <input id="regPassword" />
                        </div>

                        <button type="submit">
                            Зарегистрироваться
                        </button>
                    </div>
                )}
            </form>
        </div>
    </div>
  )
}

export default AuthModal