import styles from './ButtonBookMark.module.css'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux"
import { useToggleFavoriteMutation } from "../../api/favoritesApi"
import { authModalActions } from '../../store/authModalSlice'
import { favoritesApi } from "../../api/favoritesApi"

export default function ButtonBookMark({ bookId }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const selectFavoritesResult = favoritesApi.endpoints.getFavorites.select()
    const dispatch = useDispatch()
    const favorites = useSelector(state => selectFavoritesResult(state)?.data ?? [])

    // const { data: favorites = [] } = useGetFavoritesQuery(undefined, {
    //     skip: !isAuthenticated,
    //     refetchOnMountOrArgChange: true
    // })

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