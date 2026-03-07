const { sql, pool, poolConnect } = require("../db");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email и пароль обязательны" });
  }

  try {
    await poolConnect;

    const existingUser = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT id FROM users WHERE email = @email");

    if (existingUser.recordset.length > 0) {
      return res.status(409).json({ message: "Пользователь уже существует" });
    }

    await pool.request()
      .input("firstName", sql.VarChar, firstName)
      .input("lastName", sql.VarChar, lastName)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(`
        INSERT INTO users (firstName, lastName, email, password)
        VALUES (@firstName, @lastName, @email, @password)
      `);

    res.status(201).json({ message: "Пользователь зарегистрирован" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await poolConnect;

    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(`
        SELECT * FROM users
        WHERE email = @email AND password = @password
      `);

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};