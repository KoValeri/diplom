export const prepareForm = (form) => ({
  ...form,

  subcategoryId: form.subcategoryId ? Number(form.subcategoryId) : null,
  price: form.price ? Number(form.price) : null,
  yearOfPublication: form.yearOfPublication ? Number(form.yearOfPublication) : null,
  pages: form.pages ? Number(form.pages) : null,
  rating: form.rating ? Number(form.rating) : null,
  genres: form.genres.map(Number),
  publishingHouses: form.publishingHouses || null
})