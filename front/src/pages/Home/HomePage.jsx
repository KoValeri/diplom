import { useGetBooksQuery } from "../../api/api";
import { useGetNewBooksQuery } from "../../api/newBooksApi";
import { useGetAllNewBooksQuery } from "../../api/newBooksApi";
import { useGetBestsellersQuery } from "../../api/bestsellersApi";
import { useGetAllBestsellersQuery } from "../../api/bestsellersApi";
import Slider from "./Slider";
import Banner from "./Banner";

function HomePage() {
  const { data: books = [], isLoading, isError } = useGetBooksQuery()
  const { data: newBooks = [] } = useGetNewBooksQuery()
  const { data: allNewBooks = [] } = useGetAllNewBooksQuery()
  const { data: bestsellers = [] } = useGetBestsellersQuery()
  const { data: allBestsellers = [] } = useGetAllBestsellersQuery() 

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки</p>;

  return (
    <div>

      <Slider />
      <Banner />

      <div>
        <h1>BEST</h1>
        <ul>
          {bestsellers.map(bestseller => (
            <li key={bestseller.id} style={{ marginBottom: "20px" }}>
              <h2>{bestseller.title}</h2>
              <img
                src={bestseller.imageUrl}
                alt={bestseller.title}
                style={{ width: "150px", height: "220px", objectFit: "cover" }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>ALL BEST</h1>
        <ul>
          {allBestsellers.map(bestseller => (
            <li key={bestseller.id} style={{ marginBottom: "20px" }}>
              <h2>{bestseller.rating}</h2>
              <img
                src={bestseller.imageUrl}
                alt={bestseller.title}
                style={{ width: "150px", height: "220px", objectFit: "cover" }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>НОВИНКИ</h1>
        <ul>
          {newBooks.map(newBook => (
            <li key={newBook.id} style={{ marginBottom: "20px" }}>
              <h2>{newBook.title}</h2>
              <p>год издания: {newBook.yearOfPublication} ₽</p>
              <img
                src={newBook.imageUrl}
                alt={newBook.title}
                style={{ width: "150px", height: "220px", objectFit: "cover" }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>ВСЕ НОВИНКИ</h1>
        <ul>
          {allNewBooks.map(newBook => (
            <li key={newBook.id} style={{ marginBottom: "20px" }}>
              <h2>{newBook.title}</h2>
              <p>рейтинг: {newBook.rating}</p>
              <img
                src={newBook.imageUrl}
                alt={newBook.title}
                style={{ width: "150px", height: "220px", objectFit: "cover" }}
              />
            </li>
          ))}
        </ul>
      </div>

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
    </div>
  );
}

export default HomePage;