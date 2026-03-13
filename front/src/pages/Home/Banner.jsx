import styles from './Banner.module.css'
import book from '../../assets/banner/book.png'
import cup from '../../assets/banner/cup.png'
import truck from '../../assets/banner/truck.png'

export default function Banner() {
    return(
        <div className={styles.block}>
            <div className={styles.item}>
                <img className={styles.image} src={book} alt="book" />
                <div className={styles.text}>
                    <span className={styles.title}>Книги с душой</span>
                    <span className={styles.subTitle}>От классики до новинок</span>
                </div>
            </div>

            <div className={styles.item}>
                <img className={styles.image} src={cup} alt="cup" />
                <div className={styles.text}>
                    <span className={styles.title}>Уютное пространство</span>
                    <span className={styles.subTitle}>В самом сердце города</span>
                </div>
            </div>

            <div className={styles.item}>
                <img className={styles.image} src={truck} alt="truck" />
                <div className={styles.text}>
                    <span className={styles.title}>Бесплатная доставка</span>
                    <span className={styles.subTitle}>При заказе от 50 рублей</span>
                </div>
            </div>
        </div>
    )
}