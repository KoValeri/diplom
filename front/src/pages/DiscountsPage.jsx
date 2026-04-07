import { useGetAllDiscountsQuery } from "../api/discountsApi"; 
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";

export default function DiscountsPage() {
  const { data: allDisounts = [], isLoading, isError } = useGetAllDiscountsQuery()

    return(
        <div className="pageContent">
            <div className="pageBookColumn">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Акции'}/>
                </div>
                <BookList books={allDisounts} isLoading={isLoading} isError={isError} />
            </div>
        </div>
    )
}