
//Создаем объект фреймворка express и pool с настройками БД (Postgre)
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

//переменная порта сервера
const PORT = process.env.PORT || 3010;
const app = express();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "TestDB",
    password: "1111",
    port: 5432,
});

//Ответ, который указывает браузеру разрешить доступ к ресурсу из любого источника:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(cors());

//Используем Middleware для установки того, что будет работа с JSON
app.use(express.json());

//Создание роута по пути, который возвращает все записи из таблицы mytable
app.get("/get-data", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM mytable`);
        
        //отдаем в ответ объект data со всеми строками из результата
        res.json({data: result.rows});
    }

    catch (err){
        console.log(err);
        res.status(505).send("Ошибка при получении данных, " + err);
    }
});

app.post("/add-new-user", async(req, res) => {
    try{
        const {firstname, lastname} = req.body;

        const result = await pool.query(`INSERT INTO mytable(firstname, lastname) VALUES ('${firstname}', '${lastname}')`);
        res.status(201).json(result.rows[0]); // Возвращаем добавленную запись
    }

    catch (err){
        console.log(err);
        res.status(500).send("Ошибка при добавлении пользователя: " + err);
    }

});

app.delete("/delete-user", async(req, res) => {
    try{
        console.log(req.body);
        const {firstname} = req.body;

        const result = await pool.query(`DELETE FROM mytable WHERE firstname = '${firstname}'`);
        res.status(201).json(result.rows[0]); // Возвращаем добавленную запись
    }

    catch (err){
        console.log(err);
        res.status(500).send("Ошибка при добавлении пользователя: " + err);
    }
});

//Прослушивание порта сервера
app.listen(PORT, () => {
    console.log("Server is listening on PORT " + PORT);
});