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

module.exports = router;