export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error("Ошибка чтения:", err);
    return null;
  }
}

export function setToStorage(key, obj) {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error("Ошибка записи:", err);
  }
}
