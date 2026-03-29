import { useGetAllBestsellersQuery } from "../api/bestsellersApi";
import BookList from "../components/Book/BookList";

export default function BestelleersPage() {
  const { data: allBestsellers = [], isLoading, isError } = useGetAllBestsellersQuery()

    return(
        <div className="pageContent">
            <BookList books={allBestsellers} isLoading={isLoading} isErro={isError} />
        </div>
    )
}