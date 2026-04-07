import { useGetAllBestsellersQuery } from "../api/bestsellersApi";
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";

export default function BestelleersPage() {
  const { data: allBestsellers = [], isLoading, isError } = useGetAllBestsellersQuery()

    return(
        <div className="pageContent">
            <div className="pageBookColumn">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Хиты продаж'}/>
                </div>
                <BookList books={allBestsellers} isLoading={isLoading} isError={isError} />
            </div>
        </div>
    )
}