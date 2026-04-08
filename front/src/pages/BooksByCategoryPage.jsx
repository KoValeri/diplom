import { useGetCategoriesQuery } from "../api/categoriesApi";
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
                        <div style={{ marginBottom: '20px', color: '#8a8988' }}>{books.length} товаров</div>
                        <BookFilter />
                    </div>
                    <div className="pageBookColumn">
                        {books.length === 0 ?
                        <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                        :
                        <BookList books={books} isLoading={isLoading} isError={isError} hasFilters={true}/>}
                    </div>
                </div>
            </div>

        </div>
    )
}
