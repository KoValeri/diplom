import { useGetBooksQuery } from "../src/api/api.js";

function App() {
  const { data: books = [], isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки</p>;

  return (
    <div>
      <h1>Книжный магазин</h1>
      <ul>
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: "20px" }}>
            <h2>{book.title}</h2>
            <p>Автор: {book.author}</p>
            <p>Цена: {book.price} ₽</p>
            <img
              src={book.imageUrl}
              alt={book.title}
              style={{ width: "150px", height: "220px", objectFit: "cover" }}
            />
            <div>{book.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;