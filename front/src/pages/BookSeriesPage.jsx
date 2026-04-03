import { useGetBooksBySeriesQuery } from "../api/api";
import { useParams } from 'react-router-dom'
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";

export default function NewBooksPage() {
    const { id } = useParams();
    const { data: seriesBooks = [], isLoading, isError } = useGetBooksBySeriesQuery(id)

    return(
        <div className="pageContent">
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <ButtonBack />
                <Headline text={`Серия книг «${seriesBooks[0]?.series || ''}»`}/>
            </div>
            <BookList books={seriesBooks} isLoading={isLoading} isError={isError} />
        </div>
    )
}