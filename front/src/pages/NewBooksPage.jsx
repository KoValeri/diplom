import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import BookFilter from "../components/Book/BookFilter";
import { useSelector } from 'react-redux';
import { useGetBooksFilteredQuery } from '../api/api';

export default function NewBooksPage() {
    const filters = useSelector(state => state.bookFilters);
    const queryFilters = {
        ...filters,
        yearOfPublication: 2026
    };
    const { data: allNewBooks = [], isLoading, isError } = useGetBooksFilteredQuery(queryFilters);

    return(
        <div className="pageContent">
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <ButtonBack />
                <Headline text={'Новые поступления'}/>
            </div>

            <div className="pageColumnsFlex">
                <div >
                    <div style={{ marginBottom: '20px', color: '#8a8988' }}>{allNewBooks.length} товаров</div>
                    <BookFilter />
                </div>
                <div className="pageBookColumn">
                    {allNewBooks.length === 0 ?
                    <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                    :
                    <BookList books={allNewBooks} isLoading={isLoading} isError={isError} hasFilters={true}/>}
                </div>
            </div>
        </div>
    )
}