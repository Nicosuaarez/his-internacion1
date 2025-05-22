const db = require('../db');

const express = require('express');
const router = express.Router();

router.get('/nuevo', (req, res) => {
    res.render('pacientes/nuevo');
});

router.post('/nuevo', (req, res) =>{
    const { nombre, apellido, dni, fecha_nacimiento, sexo, telefono, direccion } = req.body;

    const query= `
    INSERT INTO pacientes(nombre, apellido, dni, fecha_nacimiento, sexo, telefono, direccion)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [nombre, apellido, dni, fecha_nacimiento, sexo, telefono, direccion], (err, result) =>{
        if (err) {
            console.error('Error al guardar al paciente:', err);
            return res.send('Ocurrio un error al guardar el paciente.');
        }
        
        res.send('Paciente registrado correctamente.');
    });
});

module.exports = router;