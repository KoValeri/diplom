import { useGetNewBooksQuery } from "../../api/newBooksApi";
import { useGetBestsellersQuery } from "../../api/bestsellersApi";
import { useGetDiscountsQuery } from "../../api/discountsApi";
import { BsArrowRight } from "react-icons/bs"
import bookStore from "../../assets/bookStore.jpg"
import Slider from "./Slider";
import Banner from "./Banner";
import BookList from "../../components/Book/BookList";
import styles from './HomePage.module.css'
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../configs/routesConfig";
import Headline from "../../components/Headline/Headline";

function HomePage() {
  const navigate = useNavigate();
  const { data: newBooks = [] } = useGetNewBooksQuery()
  const { data: bestsellers = [] } = useGetBestsellersQuery()
  const { data: discounts = [] } = useGetDiscountsQuery()

  return (
    <>
      <Slider />
      <Banner />

      <section className={styles.section}>
        <div className={styles.info}>
          <Headline text={'Новые поступления'}/>
          <div>
            <span>Показать все</span>
            <button className={styles.btnPage} onClick={() => {navigate(ROUTES.NEWBOOKS)}}><IoIosArrowForward size={25}/></button>
          </div>
        </div>
        <BookList books={newBooks} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionDiv}>
          <img className={styles.sectionImg} src={bookStore} alt="book store" />
          <div className={styles.sectionText}>
            <Headline text={'Чай и книги - идеальное сочетание'}/>
            <p>В нашем магазине можно не только выбрать любимую книгу, но и остаться на чашечку чая. Мы создали пространство, где чтение - это не спешка, а ритуал</p>
            <p>Сядьте у окна с книгой, закажите ароматный чай или кофе и просто возвольте себе выдохнуть. У нас звучит ненавязчивая музыка, мягкий свет и живой шелест страниц вокруг</p>
            <button className={styles.sectionBtn} onClick={() => {navigate(ROUTES.ABOUTUS)}}>Узнать подробнее <BsArrowRight size={25}/></button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.info}>
          <Headline text={'Хиты продаж'}/>
          <div>
            <span>Показать все</span>
            <button className={styles.btnPage} onClick={() => {navigate(ROUTES.BESTSELLERS)}}><IoIosArrowForward size={25}/></button></div>
        </div>
        <BookList books={bestsellers} />
      </section>

      <section className={styles.section}>
        <div className={styles.info}>
          <Headline text={'Акции'}/>
          <div>
            <span>Показать все</span>
            <button className={styles.btnPage} onClick={() => {navigate(ROUTES.DISCOUNTS)}}><IoIosArrowForward size={25}/></button>
          </div>
        </div>
        <BookList books={discounts} />
      </section>
    </>
  );
}

export default HomePage;