import { useGetCartQuery, useClearCartMutation } from '../../api/cartApi';
import { useSelector } from "react-redux"
import Headline from "../../components/Headline/Headline";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import CartCard from "./CartCard";
import styles from './CartPage.module.css'
import { useState, useMemo } from "react"
import CheckoutModal from './CheckoutModal';

export default function CartPage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [selectedItems, setSelectedItems] = useState([])
    const { data: cart = [], isLoading, isError } = useGetCartQuery(undefined, {
        skip: !isAuthenticated
    })
    const [clearCart] = useClearCartMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClearCart = async () => {
        try {
            await clearCart().unwrap();
            setSelectedItems([]); 
        } catch (error) {
            console.error("Ошибка при очистке:", error);
        }
    };

    const toggleSelect = (bookId) => {
        setSelectedItems(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        )
    }

    // Расчеты для правого блока
    const totals = useMemo(() => {
        const selected = cart.filter(item => selectedItems.includes(item.bookId));
        
        const count = selected.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = selected.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalDiscount = selected.reduce((sum, item) => {
            const discountAmount = item.discount > 0 ? (item.price * item.discount) * item.quantity : 0;
            return sum + discountAmount;
        }, 0);

        return {
            count,
            totalPrice: totalPrice.toFixed(2),
            discount: totalDiscount.toFixed(2),
            finalPrice: (totalPrice - totalDiscount).toFixed(2)
        };
    }, [cart, selectedItems]);

    return (
        <div className="pageContent">
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <ButtonBack />
                <Headline text="Корзина" />
            </div>

            {isLoading && <p>Загрузка...</p>}
            {isError && <p>Ошибка загрузки корзины</p>}

            {!isLoading && cart.length === 0 ? (
                <p style={{ marginBottom: '40px' }}>Ваша корзина пуста.</p>
            ) : (
                <div className={styles.cartContainer}>
                    <div className={styles.mainContent}>
                        <div className={styles.clearHeader}>
                                <button
                                    onClick={handleClearCart}
                                    className={styles.clearButton}
                                >
                                    Очистить корзину
                                </button>
                        </div>
                        {/* Левая часть: список товаров */}
                        <div className={styles.list}>
                            {cart.map(item => (
                                <CartCard
                                    key={item.id}
                                    item={item}
                                    isSelected={selectedItems.includes(item.bookId)}
                                    onSelect={toggleSelect}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Правая часть: блок оформления (Sidebar) */}
                    <aside className={styles.checkoutBlock}>
                        <div className={styles.checkoutDetails}>
                            <p className={styles.summaryInfo}>
                                {totals.count} товара
                            </p>
                            
                            <div className={styles.row}>
                                <span>Стоимость</span>
                                <span>{totals.totalPrice} р.</span>
                            </div>
                            
                            <div className={styles.row}>
                                <span>Скидка</span>
                                <span className={styles.discountText}>-{totals.discount} р.</span>
                            </div>
                            
                            <hr className={styles.divider} />
                            
                            <div className={`${styles.row} ${styles.totalRow}`}>
                                <span>Итого без доставки</span>
                                <span>{totals.finalPrice} р.</span>
                            </div>

                            <button 
                                className={styles.orderButton}
                                disabled={selectedItems.length === 0}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            <CheckoutModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                selectedItems={selectedItems} 
                setSelectedItems={setSelectedItems}
            />
        </div>
    )
}