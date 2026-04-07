import styles from "./BookList.module.css"
import BookCard from "./BookCard"

export default function BookList({ books, isLoading, isError, hasFilters=false }) {
  return (
    <>
    {isLoading ? (
        <p>Книжечки загружаются...</p>
    ) : isError ? (
        <p>Ошибка, книжечки не получены...</p>
    ) : (
        <div className={`${styles.bookList} ${hasFilters ? styles.bookListWithFilters : ''}`}>
            {books?.map(book => (
                <BookCard 
                key={book.id}
                id={book.id} 
                book={book} />
            ))}
        </div>
    )}
    </>
  )
}