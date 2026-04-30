import { useState, useEffect } from "react"

export function useBookForm(book) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    series: '',
    categoryId: '',
    subcategoryId: '',
    cover: '',
    ageRestrictions: '',
    price: '',
    yearOfPublication: '',
    pages: '',
    rating: '',
    genres: [],
    description: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (!book) return

    setForm({
      title: book.title || '',
      author: book.author || '',
      series: book.series || '',
      categoryId: book.categoryId ? String(book.categoryId) : '',
      subcategoryId: book.subcategoryId ? String(book.subcategoryId) : '',
      cover: book.cover || '',
      ageRestrictions: book.ageRestrictions || '',
      price: book.price || '',
      yearOfPublication: book.yearOfPublication || '',
      pages: book.pages || '',
      rating: book.rating || '',
      genres: book.genres?.map(g => String(g.id)) || [],
      description: book.description || '',
      imageUrl: book.imageUrl || ''
    })
  }, [book])

  function handleChange(e) {
    const { name, value } = e.target

    setForm(prev => {
      if (name === "categoryId") {
        return {
          ...prev,
          categoryId: value,
          subcategoryId: ""
        }
      }

      return {
        ...prev,
        [name]: value
      }
    })
  }

  function handleGenresChange(e) {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value)

    setForm(prev => ({
      ...prev,
      genres: selected
    }))
  }

  function resetForm() {
    if (!book) return

    setForm({
      title: book.title || '',
      author: book.author || '',
      series: book.series || '',
      categoryId: book.categoryId ? String(book.categoryId) : '',
      subcategoryId: book.subcategoryId ? String(book.subcategoryId) : '',
      cover: book.cover || '',
      ageRestrictions: book.ageRestrictions || '',
      price: book.price || '',
      yearOfPublication: book.yearOfPublication || '',
      pages: book.pages || '',
      rating: book.rating || '',
      genres: book.genres?.map(g => String(g.id)) || [],
      description: book.description || '',
      imageUrl: book.imageUrl || ''
    })
  }

  return {
    form,
    handleChange,
    handleGenresChange,
    resetForm
  }
}