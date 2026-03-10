import { useDispatch, useSelector } from "react-redux"
import { authModalActions } from "../../store/authModalSlice"
import { authActions } from "../../store/authSlice"
import styles from "./AuthModal.module.css"
import { IoMdClose } from "react-icons/io"
import { useState, useRef, useEffect } from "react"
import { FaRegEye } from "react-icons/fa"
import { FaRegEyeSlash } from "react-icons/fa"
import { useRegisterUserMutation, useLoginUserMutation } from "../../api/usersApi";
import validate from "./validation"

function AuthModal() {
  const dispatch = useDispatch()
  const { mode } = useSelector(state => state.authModal)
  const [showPassword, setShowPassword] = useState(false)
  const formRef = useRef(null)
  const [error, setError] = useState(null)

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  useEffect(() => {
    setError(null);
  }, [mode]);

  async function handleSubmit(event){
    setError(null)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget;
    const { firstName, surname, login, password } = Object.fromEntries(formData.entries());

    const inputError = validate(login, password)
    if (inputError) {
        setError(inputError)
        return
    }

    if (mode === "login") {
      try {
        const response = await loginUser({ email: login, password }).unwrap();
        localStorage.setItem("token", response.token);
        dispatch(authActions.setUser(response.user));
        dispatch(authModalActions.closeModal());

      } catch(err) {
        console.error(err);
        setError("Аккаунт не найден");
        form.reset();
      }
    } else {
      try {
        await registerUser({ firstName, lastName: surname, email: login, password }).unwrap();
        dispatch(authModalActions.openLogin());
        form.reset();
      } catch(err) {
        console.error(err);
        setError("Аккаунт уже существует");
        form.reset();
      }
    }
  }

  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
        
            <button
            className={styles.close}
            onClick={() => dispatch(authModalActions.closeModal())}
            >
            <IoMdClose size={17}/>
            </button>

            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                {mode === 'login' ? (
                    <div className={styles.fields} key="login-fields">  
                        <div className={styles.divFields}>
                            <label htmlFor="loginEmail">Логин</label>
                            <input id="loginEmail" name="login" placeholder="Email" className={styles.inputFields} onChange={() => setError(null)}/>
                        </div>

                        <div className={styles.divFields}>
                            <label htmlFor="loginPassword">Пароль</label>
                            <div className={styles.passwordDiv}>
                                <input type={showPassword ? "text" : "password"} id="loginPassword" name="password" className={`${styles.inputFields} ${styles.passwordField}`} onChange={() => setError(null)}/>
                                <button className={styles.eyeBtn} type='button' onClick={() => setShowPassword(prev => !prev)}>{ showPassword ? <FaRegEye/> : <FaRegEyeSlash/> }</button>
                            </div>
                        </div>

                        <button type="submit" className={styles.btnAuth}>
                            Войти
                        </button>

                        <div className={styles.dopInfo}>
                            У вас нет аккаунта? <button type="button" className={styles.linkBtn} onClick={() => dispatch(authModalActions.openRegister())}>Зарегистрироваться</button>
                        </div>

                        <div className={`${styles.formError} ${error ? '' : styles.formErrorHidden}`}>
                            <span>{error}</span>
                        </div>
                    </div>

                ) : (
                    <div className={styles.fields} key="reg-fields">  
                        <div className={styles.divFields}>
                            <label htmlFor="firstName">Имя</label>
                            <input id="firstName" name="firstName" className={styles.inputFields} onChange={() => setError(null)}/>
                        </div>

                        <div className={styles.divFields}>
                            <label htmlFor="surname">Фамилия</label>
                            <input id="surname" name="surname" className={styles.inputFields} onChange={() => setError(null)}/>
                        </div>

                        <div className={styles.divFields}>
                            <label htmlFor="regEmail">Email</label>
                            <input id="regEmail" name="login" className={styles.inputFields} onChange={() => setError(null)}/>
                        </div>

                        <div className={styles.divFields}>
                            <label htmlFor="regPassword">Пароль</label>
                            <input id="regPassword" name="password" className={styles.inputFields} onChange={() => setError(null)}/>
                        </div>

                        <button type="submit" className={styles.btnAuth}>
                            Зарегистрироваться
                        </button>

                        <div className={styles.dopInfo}>
                            У вас есть аккаунт? <button type="button" className={styles.linkBtn} onClick={() => dispatch(authModalActions.openLogin())}>Войти</button>
                        </div>

                        <div className={`${styles.formError} ${error ? '' : styles.formErrorHidden}`}>
                            <span>{error}</span>
                        </div>
                    </div>
                )}
            </form>
        </div>
    </div>
  )
}

export default AuthModal