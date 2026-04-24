import { useState, useEffect } from "react"

export function useBookForm(book) {
    const [form, setForm] = useState({
        title: '',
        author: '',
        series: '',
        cover: '',
        categoryName: '',
        subcategoryName: '',
        price: '',
        yearOfPublication: '',
        ageRestrictions: '',
        pages: '',
        rating: '',
        genres: '',
        description: '',
        imageUrl: ''
    })

    // заполняем форму при загрузке книги
    useEffect(() => {
        if (book) {
            setForm({
                title: book.title || '',
                author: book.author || '',
                series: book.series || '',
                cover: book.cover || '',
                categoryName: book.categoryName || '',
                subcategoryName: book.subcategoryName || '',
                price: book.price || '',
                yearOfPublication: book.yearOfPublication || '',
                ageRestrictions: book.ageRestrictions || '',
                pages: book.pages || '',
                rating: book.rating || '',
                genres: book.genres?.map(g => g.name).join(', ') || '',
                description: book.description || '',
                imageUrl: book.imageUrl || ''
            })
        }
    }, [book])

    // универсальный обработчик
    function handleChange(e) {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // сброс формы
    function resetForm() {
        if (!book) return

        setForm({
            title: book.title || '',
            author: book.author || '',
            series: book.series || '',
            cover: book.cover || '',
            categoryName: book.categoryName || '',
            subcategoryName: book.subcategoryName || '',
            price: book.price || '',
            yearOfPublication: book.yearOfPublication || '',
            ageRestrictions: book.ageRestrictions || '',
            pages: book.pages || '',
            rating: book.rating || '',
            genres: book.genres?.map(g => g.name).join(', ') || '',
            description: book.description || '',
            imageUrl: book.imageUrl || ''
        })
    }

    return {
        form,
        handleChange,
        resetForm,
        setForm
    }
}