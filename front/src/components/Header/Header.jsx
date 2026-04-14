import { Link, useLocation, useNavigate } from "react-router-dom"
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
import { useState, useRef, useEffect } from "react";
import Catalog from "./Catalog"
import { logoutAndClear } from "../../store/authThunks"

function Header() {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)
    const [isOpen, setCatalog] = useState(false)
    const catalogRef = useRef(null)
    const searchRef = useRef(null)
    const location = useLocation()
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const navigate = useNavigate()


    function handleAuthClick() {
        if (isAuthenticated) {
            dispatch(logoutAndClear())
        } else {
            dispatch(authModalActions.openLogin())
        }
    }

    function handleCatalogClick() {
        setCatalog(prev => !prev)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (catalogRef.current && !catalogRef.current.contains(event.target)) {
                setCatalog(false)
            }

            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch('')
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        setCatalog(false)
        setSearch('')
    }, [location])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search.trim()) {
                fetch(`http://localhost:5000/books?search=${search}`)
                    .then(res => res.json())
                    .then(data => setResults(data))
                    .catch(err => console.error(err))
            } else {
                setResults([])
            }
        }, 300);

        return () => clearTimeout(timeout)
    }, [search])

    function handleSubmit(e) {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search}`);
            setResults([]);
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

                    <div ref={searchRef} className={styles.searchWrapper}>
                        <form onSubmit={handleSubmit} className={styles.searchContainer}>
                            <input className={styles.search}
                                    name="search"
                                    type="text"
                                    placeholder="Найти книгу"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit">
                                <IoIosSearch size={20}/>
                            </button>
                        </form>
                        {results.length > 0 && (
                            <div className={styles.searchDropdown}>
                                {results.slice(0, 5).map(book => (
                                    <Link key={book.id} to={`/book/${book.id}`}>
                                        {book.title}
                                    </Link>
                                ))}
                            </div>
                        )}
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
                                <Link to={ROUTES.FAVORITES}><IoBookmarkOutline size={30}/></Link>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </header>
    )
}

export default Header