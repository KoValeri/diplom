import { useGetAllNewBooksQuery } from "../api/newBooksApi";
import BookList from "../components/Book/BookList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";

export default function NewBooksPage() {
  const { data: allNewBooks = [], isLoading, isError } = useGetAllNewBooksQuery()

    return(
        <div className="pageContent">
            <div className="pageBookColumn">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Новые поступления'}/>
                </div>
                <BookList books={allNewBooks} isLoading={isLoading} isError={isError} />
            </div>
        </div>
    )
}