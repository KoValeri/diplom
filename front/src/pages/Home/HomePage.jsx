import { useGetNewBooksQuery } from "../../api/newBooksApi";
import { useGetBestsellersQuery } from "../../api/bestsellersApi";

import Slider from "./Slider";
import Banner from "./Banner";
import BookList from "../../components/Book/BookList";
import styles from './HomePage.module.css'
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../configs/routesConfig";

function HomePage() {
  const navigate = useNavigate();
  const { data: newBooks = [] } = useGetNewBooksQuery()
  const { data: bestsellers = [] } = useGetBestsellersQuery()

  return (
    <>
      <Slider />
      <Banner />

      <section className={styles.section}>
        <div className={styles.info}>
          <span className={styles.headline}>Новые поступления</span>
          <div>
            <span>Показать все</span>
            <button className={styles.btnPage} onClick={() => {navigate(ROUTES.NEWBOOKS)}}><IoIosArrowForward size={25}/></button>
          </div>
        </div>
        <BookList books={newBooks} />
      </section>

      <section className={styles.section}>
        <div className={styles.info}>
          <span className={styles.headline}>Хиты продаж</span>
          <div>
            <span>Показать все</span>
            <button className={styles.btnPage} onClick={() => {navigate(ROUTES.BESTSELLERS)}}><IoIosArrowForward size={25}/></button></div>
        </div>
        <BookList books={bestsellers} />
      </section>
    </>
  );
}

export default HomePage;