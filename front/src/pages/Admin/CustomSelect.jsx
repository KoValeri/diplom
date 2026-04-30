import { useState, useRef, useEffect } from "react"
import styles from "./CustomSelect.module.css"
import { RiArrowDropDownLine } from "react-icons/ri";

export default function CustomSelect({
    options = [],
    value,
    onChange,
    placeholder = "Выберите..."
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const selected = options.find(o => String(o.value) === String(value))

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div className={styles.wrapper} ref={ref}>

            <div
                className={styles.control}
                onClick={() => setOpen(prev => !prev)}
            >
                {selected ? selected.label : placeholder}

                <span className={open ? styles.arrowOpen : styles.arrow}><RiArrowDropDownLine size={30}/></span>
            </div>

            {open && (
                <div className={styles.dropdown}>
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            className={`${styles.option} ${String(opt.value) === String(value) ? styles.active : ""}`}
                            onClick={() => {
                                onChange(opt.value)
                                setOpen(false)
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}