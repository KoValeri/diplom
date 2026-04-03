import { Link, useLocation } from "react-router-dom"
import { ROUTES } from '../../configs/routesConfig'
import { IoIosSearch } from "react-icons/io"
import { RxAvatar } from "react-icons/rx"
import { BsHandbag } from "react-icons/bs"
import { IoBookmarkOutline } from "react-icons/io5"
import { NAV_ITEMS } from "../../configs/navItemsConfig"
import { PiBooksThin } from "react-icons/pi"
import styles from './Header.module.css'
import { useDispatch, useSelector } from "react-redux"
import { authModalActions } from "../../store/authModalSlice"
import { authActions } from "../../store/authSlice"
import { useState, useRef, useEffect } from "react";
import Catalog from "./Catalog"

function Header() {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)
    const [isOpen, setCatalog] = useState(false);
    const catalogRef = useRef(null);
    const location = useLocation();

    function handleAuthClick() {
        if (isAuthenticated) {
            localStorage.removeItem("token");
            dispatch(authActions.logout());
        } else {
            dispatch(authModalActions.openLogin());
        }
    }

    function handleCatalogClick() {
        setCatalog(prev => !prev)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (catalogRef.current && !catalogRef.current.contains(event.target)) {
                setCatalog(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setCatalog(false);
    }, [location])

    return(
        <header className={styles.header}>
            <div className={styles.container}>

                <div className={styles.upNavContainer}>
                    <nav className={styles.nav}>
                        <ul className={`${styles.upNavUl} ${styles.navUl}`}>
                            {NAV_ITEMS.map(item => {
                                return (
                                <li key={item.name}>
                                    {item.href.startsWith("#") ? (
                                    <a href={item.href}>{item.name}</a>
                                    ) : (
                                    <Link to={item.href}>{item.name}</Link>
                                    )}
                                </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>

                <div className={styles.downNavContainer}>
                    <div className={styles.logo} ref={catalogRef}>
                        <Link to={ROUTES.HOME} className={styles.title}>Liberty</Link>
                        <button className={styles.btnCatalog} onClick={handleCatalogClick}><PiBooksThin size={35}/>Каталог</button>
                        {isOpen && <Catalog />}
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