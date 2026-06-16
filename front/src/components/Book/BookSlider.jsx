import { useState, useEffect } from "react";
import styles from "./BookSlider.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function BookSlider({ mainImage, additionalImages }) {
    const allImages = [{ id: 0, url: mainImage }, ...additionalImages];

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    const selectImage = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    setCurrentIndex((prev) =>
                        prev === 0 ? allImages.length - 1 : prev - 1
                    );
                    break;

                case "ArrowRight":
                    setCurrentIndex((prev) =>
                        prev === allImages.length - 1 ? 0 : prev + 1
                    );
                    break;

                case "Escape":
                    setIsOpen(false);
                    break;

                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, allImages.length]);

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.mainImageWrapper}>
                <button onClick={prevImage} className={styles.arrow}>
                    <IoIosArrowBack size={30} />
                </button>

                <img
                    src={allImages[currentIndex].url}
                    alt="Книга"
                    className={styles.mainImage}
                    onClick={() => setIsOpen(true)}
                />

                <button onClick={nextImage} className={styles.arrow}>
                    <IoIosArrowForward size={30} />
                </button>
            </div>

            <div className={styles.thumbnails}>
                {allImages.map((img, index) => (
                    <img
                        key={img.id}
                        src={img.url}
                        alt="Дополнительное фото"
                        className={`${styles.thumbnail} ${
                            index === currentIndex ? styles.activeThumbnail : ""
                        }`}
                        onClick={() => selectImage(index)}
                    />
                ))}
            </div>

            {isOpen && (
                <div>
                    <button
                        onClick={prevImage}
                        className={`${styles.arrowModal} ${styles.left}`}
                    >
                        <IoIosArrowBack size={30} />
                    </button>

                    <div
                        className={styles.modal}
                        onClick={() => setIsOpen(false)}
                    >
                        <img
                            src={allImages[currentIndex].url}
                            alt="Книга"
                            className={styles.modalImage}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <button
                        onClick={nextImage}
                        className={`${styles.arrowModal} ${styles.right}`}
                    >
                        <IoIosArrowForward size={30} />
                    </button>
                </div>
            )}
        </div>
    );
}