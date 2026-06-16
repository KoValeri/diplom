import BookList from "../components/Book/BookList";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import Headline from "../components/Headline/Headline";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import BookFilter from "../components/Book/BookFilter";
import { useGetBooksFilteredQuery } from "../api/api";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination/Pagination";

export default function NewBooksPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const filters = useSelector(state => state.bookFilters);
    const [page, setPage] = useState(1);
    const queryFilters = {
        ...filters,
        search: query,
        page,
        limit: 12
    };

    const { data = {books: [],
                    total: 0,
                    totalPages: 1},
            isLoading, isError }
    = useGetBooksFilteredQuery(queryFilters);

    useEffect(() => {
        setPage(1);
    }, [filters]);

    useEffect(() => {
        if (!isLoading) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [page, isLoading]);

    return(
        <div className="pageContent">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Результат поиска'}/>
                </div>

                <div className="pageColumnsFlex">
                    <div >
                        <div style={{ marginBottom: '20px', color: '#8a8988' }}>{data.total} товаров</div>
                        <BookFilter />
                    </div>
                    <div className="pageBookColumn">
                        {data.books.length === 0 ?
                        <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                        : <BookList books={data.books} isLoading={isLoading} isError={isError} hasFilters={true}/>}
                        <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage}/>  
                    </div>
                </div>
        </div>
    )
}