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
      return res.send('Error al verificar internación.');
    }

    // Si hay resultados, hay conflicto
    if (resultados.length > 0) {
      return res.send('Ya existe una internación hoy para este paciente o esta cama.');
    }

    // Insertar la internación
    const insertQuery = `
      INSERT INTO internaciones (paciente_id, cama_id)
      VALUES (?, ?)
    `;

    db.query(insertQuery, [pacienteId, camaId], (err2, result) => {
      if (err2) {
        console.error('Error al registrar la internación:', err2);
        return res.send('Error al internar al paciente.');
      }

      return res.send('Paciente internado correctamente.');
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
        return res.send('Error al obtener internaciones.')
    }
    res.render('internaciones/listado', { internaciones: resultados});
})
})
module.exports = router;