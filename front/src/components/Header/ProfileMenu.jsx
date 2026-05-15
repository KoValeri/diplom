import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAndClear } from "../../store/authThunks";
import { ROUTES } from "../../configs/routesConfig";
import styles from "./ProfileMenu.module.css";
import { IoListOutline, IoLogOutOutline } from "react-icons/io5";

export default function ProfileMenu() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const handleLogout = () => {
        dispatch(logoutAndClear());
    };

    return (
        <div className={styles.menu}>
            <div className={styles.header}>
                <p className={styles.userName}>{user?.firstName || 'Пользователь'}</p>
                <p className={styles.userEmail}>{user?.email}</p>
            </div>
            
            <div className={styles.divider} />
            
            <ul className={styles.list}>
                <li>
                    <Link to={ROUTES.ORDERS} className={styles.item}>
                        <IoListOutline size={20} />
                        <span>Мои заказы</span>
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className={`${styles.item} ${styles.logoutBtn}`}>
                        <IoLogOutOutline size={20} />
                        <span>Выйти</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}