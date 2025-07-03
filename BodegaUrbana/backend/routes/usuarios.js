// routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/usuarios', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO usuarios (nombre) VALUES (?);', [nombre], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

// READ
router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios;', (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

// UPDATE
router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE usuarios SET nombre = ? WHERE id = ?;', [nombre, id], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

module.exports = router;
