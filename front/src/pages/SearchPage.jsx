import BookList from "../components/Book/BookList";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import Headline from "../components/Headline/Headline";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewBooksPage() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState();
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    useEffect(() => {
        if (!query) return

        fetch(`http://localhost:5000/books?search=${query}`)
        .then(res => res.json())
        .then(data => setBooks(data))
        .catch(err => setError(err))

    }, [query])

    return(
        <div className="pageContent">
            <div className="pageBookColumn">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Результат поиска'}/>
                </div>
                {error ? <p>Ошибка поиска...</p> :
                <BookList books={books}/>}
            </div>
        </div>
    )
}