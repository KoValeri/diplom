import styles from "./BookList.module.css"
import BookCard from "./BookCard"

export default function BookList({ books, isLoading, isError }) {
  return (
    <>
    {isLoading ? (
        <p>Книжечки загружаются...</p>
    ) : isError ? (
        <p>Ошибка, книжечки не получены...</p>
    ) : (
        <div className={styles.bookList}>
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