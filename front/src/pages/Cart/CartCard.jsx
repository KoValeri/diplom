import styles from './CartCard.module.css'
import { useIncreaseQuantityMutation, useDecreaseQuantityMutation } from '../../api/cartApi'
import { useNavigate, generatePath } from 'react-router-dom';
import { ROUTES } from '../../configs/routesConfig';
import { useToggleCartMutation } from '../../api/cartApi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

export default function CartCard({ item, isSelected, onSelect }) {
    const [increase] = useIncreaseQuantityMutation()
    const [decrease] = useDecreaseQuantityMutation()
    const [toggleCart] = useToggleCartMutation()
    const navigate = useNavigate()

    const hasDiscount = item.discount > 0;
    const newPrice = hasDiscount
        ? (item.price * (1 - item.discount)).toFixed(2)
        : item.price;

    return (
        <div className={styles.item}>
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(item.bookId)}
                />
            </div>

            <img
                className={styles.cardImg}
                src={item.imageUrl}
                alt={item.title}
                onClick={() => { navigate(generatePath(ROUTES.BOOK, { id: item.bookId })) }}
            />

            <div className={styles.infoBlock}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.author}>{item.author}</span>
            </div>

            <div className={styles.controls}>
                <button onClick={() => decrease({ bookId: item.bookId })}><AiOutlineMinus size={20}/></button>
                <span>{item.quantity}</span>
                <button onClick={() => increase({ bookId: item.bookId })}><AiOutlinePlus size={20}/></button>
            </div>

            <div className={styles.priceBlock}>
                <div className={styles.price}>
                    {hasDiscount ? (
                        <>
                            <span className={styles.currentPrice}>{newPrice} р.</span>
                            <span className={styles.oldPrice}>{item.price} р.</span>
                        </>
                    ) : (
                        <span className={styles.currentPrice}>{item.price} р.</span>
                    )}
                </div>

                <button className={styles.deleteBtn} onClick={() => toggleCart({ bookId: item.bookId })}>
                    <RiDeleteBin6Line size={20} />
                </button>
            </div>
        </div>
    )
}