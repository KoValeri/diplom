import styles from "./Pagination.module.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    if (totalPages <= 1)
        return null;

    return (
        <div className={styles.pagination}>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <BsArrowLeft size={25} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={currentPage === i + 1 ? styles.active : ""}
                >
                    {i + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <BsArrowRight size={25} />
            </button>
        </div>
    );
}