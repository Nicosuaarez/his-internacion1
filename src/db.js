const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});


connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err.message);
    }else{       
        console.log('Conectado a la base de datos MySQL');
    }
});

module.exports = connection;