import { useState, useEffect, useRef } from "react";
import styles from "./CustomSelect.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function CustomSelect({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null)

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className={styles.selectWrapper} ref={selectRef}>
            <div
                className={styles.selectHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                {options.find(o => o.value === value)?.label}
                <span className={isOpen ? styles.arrowOpen : styles.arrow}><RiArrowDropDownLine size={30}/></span>
            </div>

            {isOpen && (
                <ul className={styles.optionsList}>
                {options.map((o) => (
                    <li
                    key={o.value}
                    className={`${styles.option} ${o.value === value ? styles.selected : ""}`}
                    onClick={() => handleSelect(o.value)}
                    >
                    {o.label}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}