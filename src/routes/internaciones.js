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

  const verificarQuery = `
    SELECT * FROM internaciones
    WHERE (
      cama_id = ? OR
      paciente_id = ?
    ) AND DATE(fecha_ingreso) = CURDATE()
  `;

  db.query(verificarQuery, [camaId, pacienteId], (err, resultados) => {
    if (err) {
      console.error('Error al verificar internación:', err);
      return res.render('mensaje',{
        mensaje: 'Erro al verificar la inertnacion.',
        tipo: 'mensaje-error'
      });
    }

    // Si hay resultados, hay conflicto
    if (resultados.length > 0) {
      return res.render('mensaje',{
        mensaje: 'Ya existe una internacion para esta cama o paciente.',
        tipo: 'mensaje-error'
      });
    }

    // Insertar la internación
    const insertQuery = `
      INSERT INTO internaciones (paciente_id, cama_id)
      VALUES (?, ?)
    `;

    db.query(insertQuery, [pacienteId, camaId], (err2, result) => {
      if (err2) {
        console.error('Error al registrar la internación:', err2);
        return res.render('mensaje',{
        mensaje: 'Error al internar el paciente.',
        tipo: 'mensaje-error'
      });
      }

      return res.render('mensaje',{
        mensaje: 'El paciente fue internado correctamente.',
        tipo: 'mensaje-ok'
      });
    });
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
        return res.render('mensaje',{
        mensaje: 'Error al obtener internaciones.',
        tipo: 'mensaje-error'
      });
    }
    res.render('internaciones/listado', { internaciones: resultados});
})
})
module.exports = router;