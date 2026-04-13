import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import BookFilter from "../components/Book/BookFilter";
import { useSelector } from 'react-redux';
import { useGetBooksFilteredQuery } from '../api/api';

export default function DiscountsPage() {
    const filters = useSelector(state => state.bookFilters);
    const queryFilters = {
        ...filters,
        hasDiscount: true
    };
    const { data: allDisounts = [], isLoading, isError } = useGetBooksFilteredQuery(queryFilters);

    return(
        <div className="pageContent">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Акции'}/>
                </div>
        
                <div className="pageColumnsFlex">
                    <div >
                        <div style={{ marginBottom: '20px', color: '#8a8988' }}>{allDisounts.length} товаров</div>
                        <BookFilter />
                    </div>
                    <div className="pageBookColumn">
                        {allDisounts.length === 0 ?
                        <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                        :
                        <BookList books={allDisounts} isLoading={isLoading} isError={isError} hasFilters={true}/>}
                    </div>
                </div>
        
        </div>
    )
}