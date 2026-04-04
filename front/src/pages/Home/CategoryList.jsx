import styles from "./CategoryList.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../configs/routesConfig";
import { useState, useEffect } from "react";

export default function CategoryList({ categories }) {
    const [openCategoryId, setOpenCategoryId] = useState(null);

    function toggleSubCategories(id) {
        setOpenCategoryId(prev => (prev === id ? null : id))
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(`.${styles.subcategories}`) &&
                !event.target.closest(`.${styles.poster}`) &&
                !event.target.closest(`.${styles.categoryName}`)) {
                setOpenCategoryId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div>
            <div className={styles.categories}>
                {categories.map((cat) => (
                    <div className={styles.category}>
                        {openCategoryId === cat.id ? (
                            <>
                                <div className={styles.subcategories}>
                                    <ul>
                                        {cat.subcategories.map(sub => (
                                            <li key={sub.id}>
                                                <Link to={ROUTES.BOOKSBYCATEGORIES.replace(':id', sub.id)}>
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.floorMenu}></div>
                            </>
                        ) : (
                            <div className={styles.posterWrapper}>
                                <img className={styles.poster} src={cat.poster} alt={cat.name} onClick={() => toggleSubCategories(cat.id)}/>
                                <div className={styles.floor}></div>
                            </div>
                        )}
                        <div className={styles.categoryName} onClick={() => toggleSubCategories(cat.id)}>
                            {cat.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}