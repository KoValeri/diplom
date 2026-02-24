import { useEffect, useState } from "react";
import { getBooks } from "./api";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(data => setBooks(data));
  }, []);

  return (
    <div>
      <h1>Книжный магазин</h1>
      <ul>
        {books.map(book => (
          <li key={book.id} style={{marginBottom: "20px"}}>
            <h2>{book.title}</h2>
            <p>Автор: {book.author}</p>
            <p>Цена: {book.price} ₽</p>
            <img 
              src={book.imageUrl} 
              alt={book.title} 
              style={{width: "150px", height: "220px", objectFit: "cover"}} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
