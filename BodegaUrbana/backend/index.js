const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bodegaurbana'
});


//create

app.post('/usuarios', (req, res) => {
    const {nombre} = req.body;
    db.query('INSERT INTO usuarios (nombre) VALUES (?,?)', [nombre], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
} );

//read
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FORM usuarios;', (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
} )



//put
app.put('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const {nombre} = req.body;
    db.query('UPDATE usuarios SET nombre = ? WHERE id = ?;', [nombre,id],(err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
} )
 

app.listen(3000, () =>{
    console.log('Servidor corriendo en el puerto 3000')
})