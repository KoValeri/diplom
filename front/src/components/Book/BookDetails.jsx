import styles from './BookDetails.module.css'
import { useGetBookByIdQuery  } from "../../api/api"
import { useGetBooksBySeriesQuery } from '../../api/api'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa"
import CartButton from '../CartButton/CartButton'
import ButtonBookMark from "../ButtonBookMark/ButtonBookMark"
import BookSlider from './BookSlider'
import BookList from './BookList'
import { useNavigate, generatePath } from 'react-router-dom';
import { ROUTES } from '../../configs/routesConfig'
import { IoIosArrowForward } from "react-icons/io"
import { useGetBookReviewsQuery, useCreateReviewMutation, useDeleteReviewMutation } from '../../api/api'
import { useSelector } from "react-redux"
import { useState } from "react";

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate()
    const { data: book, isLoading } = useGetBookByIdQuery(id);
    const { data: seriesBooks = [], isLoading: booksSeriesLoading, isError } = useGetBooksBySeriesQuery(id, {skip: !id,});
    const hasDiscount = book?.discount > 0;
    const newPrice = hasDiscount
        ? (book?.price * (1 - book?.discount)).toFixed(2)
        : book?.price;
    const { data: reviews = [], isLoading: reviewsLoading } = useGetBookReviewsQuery(id);
    const [createReview] = useCreateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();
    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const userId = user?.id;
    const [text, setText] = useState("");

    function handleClick(){
        navigate( generatePath(ROUTES.SERIES, {id}) )
    }

    const handleAddReview = async () => {
        if (!userId) return;
        if (!text.trim()) return;

        await createReview({
            bookId: id,
            userId: userId,
            comment: text
        });

        setText("");
    };

    const handleDelete = async (reviewId) => {
        await deleteReview(reviewId);
    };

    return (
        <>
            {isLoading ? (
                <p>Книжечка загружается...</p>
            ) : (
                <>
                    <div className={styles.upConteiner}>
                        <BookSlider mainImage={book.imageUrl} additionalImages={book.additionalImages}/>
                        
                        <div className={styles.bookMainInfo}>
                            <p className={styles.title}>{book.title}</p>
                            <p className={styles.author}>{book.author}</p>
                            <p className={styles.rating}><FaStar />{book.rating}</p>
                            <div className={styles.price}>
                                {hasDiscount ? (
                                    <>
                                    <span>{newPrice} р.</span>
                                    <span className={styles.oldPrice}>{book.price} р.</span>
                                    <span className={styles.discountFlag}>
                                        -{Math.round(book.discount * 100)}%
                                    </span>
                                    </>
                                ) : (
                                    <span className={styles.price}>{book.price} р.</span>
                                )}
                            </div>
                            <div className={styles.btns}>
                                <CartButton bookId={book.id}/>
                                <ButtonBookMark bookId={book.id} />
                            </div>
                            <div className={styles.description}>{book.description}</div>
                        </div>
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.characteristics}>Характеристики</div>
                        <div>
                            <span className={styles.infoPoint}>Жанры:</span> {book.genres.map(g => g.name).join(', ')}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Издательство:</span> {book.publishingHouse}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Год идзания:</span> {book.yearOfPublication}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Количество страниц:</span> {book.pages}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Тип обложки:</span> {book.cover}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Возрастное ограничение:</span> {book.ageRestrictions}
                        </div>
                        {book.series && 
                            <div>
                                <span className={styles.infoPoint}>Серия книг:</span> {book.series}
                            </div>
                        }
                        <div>
                            <span className={styles.infoPoint}>Категория:</span> {book.categoryName}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Подкатегория:</span> {book.subcategoryName}
                        </div>
                    </div>

                    {book.series && <div className={styles.seriesHeader}>
                        <div className={styles.bookSeries}>Все книги серии «{book.series}»</div>
                        <button className={styles.btnPage}><IoIosArrowForward size={30} onClick={handleClick}/></button>
                    </div>}
                    <BookList books={seriesBooks} isLoading={booksSeriesLoading} isError={isError}/>

                    <div className={styles.reviewsSection}>
                        <div className={styles.characteristics}>Отзывы</div>
                        
                        <div className={styles.reviewsBox}>
                            <textarea
                                className={styles.textarea}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Напишите отзыв..."
                            />
                            {isAuthenticated && 
                                <button className={styles.addReviewBtn} onClick={handleAddReview}>
                                    Добавить отзыв
                                </button>
                            }
                        </div>

                        <div className={styles.reviewsList}>
                            {reviewsLoading ? (
                                <p>Загрузка...</p>
                            ) : reviews.length === 0 ? (
                                <p className={styles.infoPoint}>Пока отзывов нет. Будьте первым!</p>
                            ) : (
                                reviews.map(review => (
                                    <div key={review.id} className={styles.reviewCard}>
                                        <div className={styles.reviewHeader}>
                                            <div className={styles.userInfo}>
                                                <span className={styles.userName}>
                                                    {review.firstName} {review.lastName}
                                                </span>
                                            </div>
                                            {user?.role === "admin" && (
                                                <button 
                                                    className={styles.deleteBtn} 
                                                    onClick={() => handleDelete(review.id)}
                                                >
                                                    Удалить
                                                </button>
                                            )}
                                        </div>
                                        <p className={styles.reviewText}>{review.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </>
            )}
        </>
    );
}