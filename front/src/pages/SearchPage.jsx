import BookList from "../components/Book/BookList";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import Headline from "../components/Headline/Headline";
import { useSearchParams } from "react-router-dom";
import BookFilter from "../components/Book/BookFilter";

import { useGetBooksFilteredQuery } from "../api/api";
import { useSelector } from "react-redux";

export default function NewBooksPage() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");
    const filters = useSelector(state => state.bookFilters);

    const queryFilters = {
        ...filters,
        search: query
    };

    const { data: books = [], isLoading, isError } = useGetBooksFilteredQuery(queryFilters);

    return(
        <div className="pageContent">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Результат поиска'}/>
                </div>

                <div className="pageColumnsFlex">
                    <div >
                        <div style={{ marginBottom: '20px', color: '#8a8988' }}>{books.length} товаров</div>
                        <BookFilter />
                    </div>
                    <div className="pageBookColumn">
                        {books.length === 0 ?
                        <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                        : <BookList books={books} isLoading={isLoading} isError={isError} hasFilters={true}/>}
                    </div>
                </div>
        </div>
    )
}