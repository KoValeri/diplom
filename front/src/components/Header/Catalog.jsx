import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../api/categoriesApi";
import styles from "./Catalog.module.css";
import { ROUTES } from "../../configs/routesConfig";

export default function Catalog () {
  const { data = [] } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className={styles.menu}>
      <div className={styles.categories}>
        {data.map((cat) => (
          <div
            key={cat.id}
            className={`${styles.category} ${
              activeCategory?.id === cat.id ? styles.active : ""
            }`}
            onMouseEnter={() => setActiveCategory(cat)}
          >
            {cat.name}
          </div>
        ))}
      </div>

      <div className={styles.subcategories}>
        {activeCategory ? (
          <>
            <ul>
              {activeCategory.subcategories.map((sub) => (
                <li key={sub.id}>
                    <Link to={ROUTES.BOOKSBYCATEGORIES.replace(':id', sub.id)} >{sub.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className={styles.placeholder}>
            Выберите категорию
          </div>
        )}
      </div>
    </div>
  );
};
