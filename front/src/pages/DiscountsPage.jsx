import { useGetAllDiscountsQuery } from "../api/discountsApi"; 
import BookList from "../components/Book/BookList";

export default function DiscountsPage() {
  const { data: allDisounts = [], isLoading, isError } = useGetAllDiscountsQuery()

    return(
        <div className="pageContent">
            <BookList books={allDisounts} isLoading={isLoading} isError={isError} />
        </div>
    )
}