import { useState, useEffect } from "react"

const initialState = {
  title: '',
  author: '',
  series: '',
  categoryId: '',
  subcategoryId: '',
  cover: '',
  ageRestrictions: '',
  publishingHouse: '',
  price: '',
  yearOfPublication: '',
  pages: '',
  rating: '',
  discount: '',
  genres: [],
  description: '',
  imageUrl: ''
}

function normalize(value) {
  return typeof value === "string" ? value.trim() : ""
}

function mapBookToForm(book) {
  return {
    title: book.title || '',
    author: book.author || '',
    series: book.series || '',
    categoryId: book.categoryId ? String(book.categoryId) : '',
    subcategoryId: book.subcategoryId ? String(book.subcategoryId) : '',
    cover: book.cover || '',
    ageRestrictions: book.ageRestrictions || '',
    publishingHouse: normalize(book.publishingHouse),
    price: book.price || '',
    yearOfPublication: book.yearOfPublication || '',
    pages: book.pages || '',
    rating: book.rating || '',
    discount: book.discount || '',
    genres: book.genres?.map(g => String(g.id)) || [],
    description: book.description || '',
    imageUrl: book.imageUrl || ''
  }
}

export function useBookForm(book, mode) {
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (mode === "edit" && book) {
      setForm(mapBookToForm(book))
    }

    if (mode === "create") {
      setForm(initialState)
    }
  }, [book, mode])

  function handleChange(e) {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === "categoryId" && { subcategoryId: "" })
    }))
  }

  function handleGenresChange(e) {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value)

    setForm(prev => ({
      ...prev,
      genres: selected
    }))
  }

  function resetForm() {
    setForm(book ? mapBookToForm(book) : initialState)
  }

  return {
    form,
    handleChange,
    handleGenresChange,
    resetForm
  }
}