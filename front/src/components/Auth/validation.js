export default function validate(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{10,}$/;

  if (!emailRegex.test(email)) {
    return "Введите корректный email";
  }

  if (!passwordRegex.test(password)) {
    return "Пароль должен содержать минимум 10 символов, букву и цифру";
  }

  return null;
}