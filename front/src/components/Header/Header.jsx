import { Link } from "react-router-dom"
import { ROUTES } from '../../configs/routesConfig'
import { IoIosSearch } from "react-icons/io"
import { RxAvatar } from "react-icons/rx"
import { BsHandbag } from "react-icons/bs"
import { IoBookmarkOutline } from "react-icons/io5"
import { NAV_ITEMS } from "../../configs/navItemsConfig"
import { PiBooks } from "react-icons/pi"
import styles from './Header.module.css'
import { useDispatch, useSelector } from "react-redux"
import { authModalActions } from "../../store/authModalSlice"
import { authActions } from "../../store/authSlice"

function Header() {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)

    function handleAuthClick() {

    if (isAuthenticated) {
        localStorage.removeItem("token");
        dispatch(authActions.logout());
    } else {
        dispatch(authModalActions.openLogin());
    }

}

    return(
        <header className={styles.header}>
            <div className={styles.container}>

                <div className={styles.upNavContainer}>
                    <nav className={styles.nav}>
                        <ul className={`${styles.upNavUl} ${styles.navUl}`}>
                            {NAV_ITEMS.map(item => {
                                return (
                                <li key={item.name}>
                                    <Link to={item.href}>{item.name}</Link>
                                </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>

                <div className={styles.downNavContainer}>
                    <div className={styles.logo}>
                        <Link to={ROUTES.HOME} className={styles.title}>Liberty</Link>
                        <button className={styles.btnCatalog}><PiBooks size={30}/>Каталог</button>
                    </div>
                    <div className={styles.searchContainer}>
                        <input className={styles.search}
                                name="search"
                                type="text"
                                placeholder="Найти книгу"
                        />
                        <button>
                            <IoIosSearch size={20}/>
                        </button>                        
                    </div>
                    <nav className={styles.nav}>
                        <ul className={`${styles.downNavUl} ${styles.navUl}`}>
                            <li>
                                <button
                                    onClick={handleAuthClick}
                                    className={styles.avatar}
                                >
                                    <RxAvatar size={30}/> {isAuthenticated ? 'Выйти' : 'Войти'}
                                </button>
                            </li>
                            <li>
                                <Link to={'#'}><BsHandbag size={30}/></Link>
                            </li>
                            <li>
                                <Link to={'#'}><IoBookmarkOutline size={30}/></Link>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </header>
    )
}

export default Header