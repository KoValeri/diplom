import { useState, useEffect } from "react";
import { useCheckoutMutation } from "../../api/cartApi";
import { useGetMeQuery } from "../../api/usersApi";
import styles from "./CheckoutModal.module.css";
import { IoMdClose } from "react-icons/io"

export default function CheckoutModal({ isOpen, onClose, selectedItems, setSelectedItems }) {
  const [checkout, { isLoading }] = useCheckoutMutation();
  const { data: user } = useGetMeQuery();

  const [form, setForm] = useState({
    fullName: "", // Объединил Имя/Фамилию как в макете (ФИО)
    email: "",
    phone: "",
    address: "",
    apartment: "",
    comment: "",
    paymentMethod: "cash",
    deliveryMethod: "pickup",
  });

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        email: user.email || "",
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await checkout({
        ...form,
        items: selectedItems,
      }).unwrap();

      setSelectedItems([]);
      onClose();
    } catch (e) {
      console.error("Ошибка оформления:", e);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
        <button className={styles.closeBtn} onClick={onClose}><IoMdClose size={18} /></button>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* <button className={styles.closeBtn} onClick={onClose}><IoMdClose size={18} /></button> */}
        <span className={styles.title}>Оформление заказа</span>

        <div className={styles.formContainer}>
          {/* --- ШАГ 1: Контактная информация --- */}
          <section className={styles.stepSection}>
            <div className={styles.stepBadge}>1</div>
            <div className={styles.stepContent}>
              <p>Контактная информация</p>
              <div className={styles.inputGrid}>
                <div className={styles.inputWrapper}>
                  <label>ФИО*</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} />
                </div>
                <div className={styles.inputWrapper}>
                  <label>E-mail*</label>
                  <input name="email" value={form.email} onChange={handleChange}/>
                </div>
                <div className={styles.inputWrapper}>
                  <label>Телефон*</label>
                  <input name="phone" value={form.phone} onChange={handleChange}/>
                </div>
              </div>
            </div>
          </section>

          {/* --- ШАГ 2: Способ получения --- */}
          <section className={styles.stepSection}>
            <div className={styles.stepBadge}>2</div>
            <div className={styles.stepContent}>
              <p>Способ получения</p>
              <div className={styles.cardGrid}>
                <label className={`${styles.methodCard} ${form.deliveryMethod === 'pickup' ? styles.activeCard : ''}`}>
                  <input type="radio" name="deliveryMethod" value="pickup" checked={form.deliveryMethod === "pickup"} onChange={handleChange} />
                  <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>Самовывоз</span>
                    <span className={styles.cardSub}>Бесплатно</span>
                  </div>
                  <div className={styles.radioCircle}></div>
                </label>

                <label className={`${styles.methodCard} ${form.deliveryMethod === 'courier' ? styles.activeCard : ''}`}>
                  <input type="radio" name="deliveryMethod" value="courier" checked={form.deliveryMethod === "courier"} onChange={handleChange} />
                  <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>Курьером</span>
                    <span className={styles.cardSub}>6 р.</span>
                  </div>
                  <div className={styles.radioCircle}></div>
                </label>
              </div>

              {form.deliveryMethod === "courier" && (
                <div className={styles.deliveryFields}>
                  <div className={styles.inputWrapper}>
                    <label>Куда доставить</label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="Улица и номер дома" />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* --- ШАГ 3: Способ оплаты --- */}
          <section className={styles.stepSection}>
            <div className={styles.stepBadge}>3</div>
            <div className={styles.stepContent}>
              <p>Способ оплаты</p>
              <div className={styles.cardGrid}>
                <label className={`${styles.methodCard} ${form.paymentMethod === 'cash' ? styles.activeCard : ''}`}>
                  <input type="radio" name="paymentMethod" value="cash" checked={form.paymentMethod === "cash"} onChange={handleChange} />
                  <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>При получении</span>
                    <span className={styles.cardSub}>Картой, наличными</span>
                  </div>
                  <div className={styles.radioCircle}></div>
                </label>

                <label className={`${styles.methodCard} ${form.paymentMethod === 'card' ? styles.activeCard : ''}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === "card"} onChange={handleChange} />
                  <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>Картой на сайте</span>
                    <span className={styles.cardSub}>МИР, Visa...</span>
                  </div>
                  <div className={styles.radioCircle}></div>
                </label>
              </div>
            </div>
          </section>
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Оформление..." : "Оформить заказ"}
        </button>
      </div>
    </div>
  );
}