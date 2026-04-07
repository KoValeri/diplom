const { sql, pool, poolConnect } = require("../db");

exports.getGenres = async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query(`SELECT * FROM genres`);
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Ошибка сервера");
    }
};
