import { useGetAllNewBooksQuery } from "../api/newBooksApi";
import BookList from "../components/Book/BookList";

export default function NewBooksPage() {
  const { data: allNewBooks = [], isLoading, isError } = useGetAllNewBooksQuery()

    return(
        <>
            <BookList books={allNewBooks} isLoading={isLoading} isError={isError} />
        </>
    )
}