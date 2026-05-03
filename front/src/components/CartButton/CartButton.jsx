import styles from './CartButton.module.css'
import { useSelector, useDispatch } from "react-redux"
import { useGetCartQuery, useToggleCartMutation } from "../../api/cartApi"
import { authModalActions } from '../../store/authModalSlice'

export default function CartButton({ bookId }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const { data: cart = [] } = useGetCartQuery()
    const [toggleCart] = useToggleCartMutation()

    const isInCart = isAuthenticated && cart?.some(item => item.bookId === bookId)

    function handleClick(e) {
        e.stopPropagation()

        if (!isAuthenticated) {
            dispatch(authModalActions.openLogin())
            return
        }

        toggleCart({ bookId })
    }

    return (
        <button className={styles.btn} onClick={handleClick}>
            {isInCart
                ? 'Добавлено'
                : 'В корзину'
            }
        </button>
    )
}