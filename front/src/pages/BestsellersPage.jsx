import { useSelector } from 'react-redux';
import { useGetBooksFilteredQuery } from '../api/api';
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import BookFilter from "../components/Book/BookFilter";

export default function BestelleersPage() {
    const filters = useSelector(state => state.bookFilters);
    const queryFilters = {
        ...filters,
        minRating: 4.8
    };
    const { data: allBestsellers = [], isLoading, isError } = useGetBooksFilteredQuery(queryFilters);

    return(
        <div className="pageContent">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Хиты продаж'}/>
                </div>
                
                <div className="pageColumnsFlex">
                    <div >
                        <div style={{ marginBottom: '20px', color: '#8a8988' }}>{allBestsellers.length} товаров</div>
                        <BookFilter />
                    </div>
                    <div className="pageBookColumn">
                        {allBestsellers.length === 0 ?
                        <p style={{ marginBottom: '40px'}}>В данный момент таких книг нет в нашем магазине</p>
                        :
                        <BookList books={allBestsellers} isLoading={isLoading} isError={isError} hasFilters={true}/>}
                    </div>
                </div>
        
        </div>
    )
}