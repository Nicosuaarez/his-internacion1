const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/nueva/:id', (req, res) => {
    const pacienteId = req.params.id;

    res.render('internaciones/nueva', { pacienteId });
});

router.post('/nueva/:id', (req, res) => {
    const pacienteId = req.params.id;
    const camaId = req.body.cama_id;

    const query = `
        INSERT INTO internaciones (paciente_id, cama_id)
        VALUES (?, ?)
    `;

    db.query(query, [pacienteId, camaId], (err, result) => {
        if (err){
            console.error('Error al registrar la internacion:', err);
            return res.send('Ocurrio un error al internar un paciente.')            
        }
        
        res.send('El paciente ha sido internado correctamente.');
    });
});

router.get('/', (req, res) => {
    const query=`
        SELECT internaciones.id, internaciones.fecha_ingreso, internaciones.cama_id, pacientes.nombre, pacientes.apellido
        FROM internaciones
        JOIN pacientes ON internaciones.paciente_id = pacientes.id
        ORDER BY internaciones.fecha_ingreso DESC
        `;

db.query(query, (err, resultados) => {
    if (err) {
        console.error('Error al obtener internaciones:', err);
        return res.send('Error al obtener internaciones.')
    }
    res.render('internaciones/listado', { internaciones: resultados});
})
})
module.exports = router;