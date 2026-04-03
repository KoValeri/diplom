import { useGetBooksBySubcategoryQuery } from "../api/api";
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import { useParams } from "react-router-dom";

export default function BooksByCategoryPage() {
    const { id } = useParams();
    const { data: booksByCategory = [], isLoading, isError } = useGetBooksBySubcategoryQuery(id)

    return(
        <div className="pageContent">
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <ButtonBack />
                <Headline text={booksByCategory[0]?.subcategoryName}/>
            </div>
            {booksByCategory.length === 0 ? 
            <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
            :
            <BookList books={booksByCategory} isLoading={isLoading} isError={isError} />}
        </div>
    )
}