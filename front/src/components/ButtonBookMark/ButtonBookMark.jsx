import styles from './ButtonBookMark.module.css'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux"
import { useToggleFavoriteMutation, useGetFavoritesQuery } from "../../api/favoritesApi"
import { authModalActions } from '../../store/authModalSlice'

export default function ButtonBookMark({ bookId }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const { data: favorites = [] } = useGetFavoritesQuery(undefined, {
        skip: !isAuthenticated,
        refetchOnMountOrArgChange: true
    })

    const [toggleFavorite] = useToggleFavoriteMutation()

    const isFavorite = isAuthenticated && favorites?.some(b => b.id === bookId)

    function handleClick(e) {
        e.stopPropagation()

        if (!isAuthenticated) {
            dispatch(authModalActions.openLogin())
            return
        }

        toggleFavorite({ bookId })
    }

    return(
        <button className={styles.btn} onClick={handleClick}>
            {isFavorite 
                ? <IoBookmark size={30}/> 
                : <IoBookmarkOutline size={30}/>
            }
        </button>
    )
}