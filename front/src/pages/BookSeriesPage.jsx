import { useGetBooksBySeriesQuery } from "../api/api";
import { useParams } from 'react-router-dom'
import BookList from "../components/Book/BookList";

export default function NewBooksPage() {
    const { id } = useParams();
    const { data: seriesBooks = [], isLoading, isError } = useGetBooksBySeriesQuery(id)

    return(
        <div className="pageContent">
            <BookList books={seriesBooks} isLoading={isLoading} isError={isError} />
        </div>
    )
}