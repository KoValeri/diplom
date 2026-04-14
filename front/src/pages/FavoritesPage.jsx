import { useGetFavoritesQuery } from '../api/favoritesApi';
import { useSelector } from "react-redux"
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";

export default function FavoritesPage() {
    const userId = useSelector(state => state.auth.user?.id)
    const { data: favorites = [], isLoading, isError } = useGetFavoritesQuery(userId, {
        skip: !userId
    })

    return(
        <div className="pageContent">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={`Избранное`}/>
                </div>
                {favorites.length === 0 ?
                <p style={{ marginBottom: '40px'}}>вы ещё не выбрали книги, которые бы вам приглянулись.</p>
                :
                <BookList books={favorites} isLoading={isLoading} isError={isError} />}
        </div>
    )
}