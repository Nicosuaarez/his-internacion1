const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/nueva/:id', (req, res) => {
    const pacienteId = req.params.id;
    res.render('admisiones/nueva', { pacienteId });
});

router.post('/nueva/:id', (req, res) => {
    const pacienteId = req.params.id;
    const motivo = req.body.motivo;

    if (motivo === 'Urgencia'){
        return res.redirect(`/internaciones/nueva/${pacienteId}`);
    }else{
        return res.render('mensaje',{
        mensaje: `Admision registrada. No requiere internacion por el motivo seleccionado: ${motivo}`,
        tipo: 'mensaje-ok'
      });
    }
    });
            
            
module.exports = router;
