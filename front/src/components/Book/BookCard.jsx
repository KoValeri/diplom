import styles from "./BookCard.module.css"
import Button from "../Button/Button"
import ButtonBookMark from "../ButtonBookMark/ButtonBookMark"
import { FaStar } from "react-icons/fa"
import { useNavigate, generatePath } from 'react-router-dom';
import { ROUTES } from "../../configs/routesConfig";

export default function BookCard({ book }) {
    const navigate = useNavigate()
    const id = book.id
    const hasDiscount = book.discount > 0;
    const newPrice = hasDiscount
        ? (book.price * (1 - book.discount)).toFixed(2)
        : book.price;

    function handleClick(){
        navigate( generatePath(ROUTES.BOOK, {id}) )
    }

    return(
        <>
            <div className={styles.card} onClick={handleClick}>
                <img className={styles.cardImg} src={book.imageUrl} alt={book.title}/>
                <div className={styles.info}>
                    <div className={styles.rating}><FaStar /> {book.rating}</div>
                    <span className={styles.title}>{book.title}</span>
                    <span className={styles.author}>{book.author}</span>

                    <div className={styles.btns_price}>
                        <div className={styles.price}>
                            {hasDiscount ? (
                                <>
                                <span>{newPrice} р.</span>
                                <span className={styles.oldPrice}>{book.price} р.</span>
                                </>
                            ) : (
                                <span className={styles.price}>{book.price} р.</span>
                            )}
                        </div>
                        <div className={styles.btns}>
                            <Button text='В корзину'/>
                            <ButtonBookMark />
                        </div>
                    </div>
                </div>

                {book.yearOfPublication === 2026 && <div className={styles.newFlag}>Новинка</div>}
                {hasDiscount && (
                    <div className={styles.discountFlag}>
                        -{Math.round(book.discount * 100)}%
                    </div>
                    )}
            </div>  
        </>
    )
}