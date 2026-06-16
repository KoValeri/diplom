import { useGetCategoriesQuery } from "../api/categoriesApi";
import { useState, useEffect } from 'react';
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetBooksFilteredQuery } from "../api/api";
import BookFilter from "../components/Book/BookFilter";
import Pagination from "../components/Pagination/Pagination";

export default function BooksByCategoryPage() {
    const filters = useSelector(state => state.bookFilters);
    const [page, setPage] = useState(1);
    const { id } = useParams();
    const {
    data = {
        books: [],
        total: 0,
        totalPages: 1
    },
    isLoading,
    isError
    } = useGetBooksFilteredQuery({
        subcategoryId: parseInt(id, 10),
        ...filters,
        page,
        limit: 12
    });

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

    const { data: categories = [] } = useGetCategoriesQuery();
    const subcategory = categories
        .flatMap(c => c.subcategories)
        .find(sc => sc.id === parseInt(id, 10));

    return(
        <div className="pageContent">

            <div>
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={subcategory?.name || ""} />
                </div>

                <div className="pageColumnsFlex">
                    <div >
                        <div style={{ marginBottom: '20px', color: '#8a8988' }}>{data.total} товаров</div>
                        <BookFilter />
                    </div>
                    <div className="pageBookColumn">
                        {data.books.length === 0 ?
                        <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                        :
                        <BookList books={data.books} isLoading={isLoading} isError={isError} hasFilters={true}/>}
                        <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage}/>                    
                    </div>
                </div>
            </div>

        </div>
    )
}
