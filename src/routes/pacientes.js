const db = require('../db');

const express = require('express');
const router = express.Router();
//ruta del formulario
router.get('/nuevo', (req, res) => {
    res.render('pacientes/nuevo');
});
//ruta para guardar el paciente
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

//mostrar los pacientes
router.get('/', (req, res) => {
    db.query('SELECT * FROM pacientes', (err, resultados) =>{
        if (err) {
            console.error('Error al obtener pacientes:', err);
            return res.send('Error al obtener pacientes');
        }

        res.render('pacientes/listado', { pacientes: resultados });
    });
});


module.exports = router;