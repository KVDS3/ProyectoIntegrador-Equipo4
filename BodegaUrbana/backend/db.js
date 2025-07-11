// db.js
const mysql = require('mysql2');

// Crear conexión
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bodegaurbana'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la DB:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Crear versión con promesas
const promiseDb = db.promise();

// Exportar ambas versiones con nombres consistentes
module.exports = {
    db,        // Versión con callbacks
    promiseDb  // Versión con promesas (usar esta)
};