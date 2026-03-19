import styles from "./BookCard.module.css"
import Button from "../Button/Button"
import ButtonBookMark from "../ButtonBookMark/ButtonBookMark"
import { FaStar } from "react-icons/fa"
import { useNavigate, generatePath } from 'react-router-dom';
import { ROUTES } from "../../configs/routesConfig";

export default function BookCard({ book }) {
    const navigate = useNavigate()
    const id = book.id

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
                        <span className={styles.price}>{book.price} р.</span>
                        <div className={styles.btns}>
                            <Button text='В корзину'/>
                            <ButtonBookMark />
                        </div>
                    </div>
                </div>

                {book.yearOfPublication === 2026 && <div className={styles.newFlag}>Новинка</div>}
            </div>
            
            
        </>
    )
}