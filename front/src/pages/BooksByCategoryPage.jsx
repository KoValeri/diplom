// import { useGetBooksBySubcategoryQuery } from "../api/api";
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useGetBooksFilteredQuery } from "../api/api";
import BookFilter from "../components/Book/BookFilter";

export default function BooksByCategoryPage() {
    const filters = useSelector(state => state.bookFilters);
    const { id } = useParams();
    const { data: books = [], isLoading, isError } = useGetBooksFilteredQuery({
        subcategoryId: parseInt(id, 10),
        ...filters,
    });

    return(
        <div className="pageContent">

        <BookFilter />

            <div className="pageBookColumn">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={books[0]?.subcategoryName}/>
                </div>
                {books.length === 0 ?
                <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                :
                <BookList books={books} isLoading={isLoading} isError={isError} hasFilters={true}/>}
            </div>

        </div>
    )
}
