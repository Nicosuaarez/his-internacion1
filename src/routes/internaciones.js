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

  const verificarPaciente = `
    SELECT * FROM internaciones
    WHERE paciente_id = ? AND DATE(fecha_ingreso) = CURDATE()
  `;

  const verificarCama = `
    SELECT * FROM internaciones
    WHERE cama_id = ? AND DATE(fecha_ingreso) = CURDATE()
  `;

  // Valida el paciente
  db.query(verificarPaciente, [pacienteId], (err1, resPaciente) => {
    if (err1) {
      console.error('Error al verificar paciente:', err1);
      return res.render('mensaje', {
        mensaje: 'Error al verificar la internación del paciente.',
        tipo: 'mensaje-error'
      });
    }

    if (resPaciente.length > 0) {
      return res.render('mensaje', {
        mensaje: '⚠️ Este paciente ya está internado hoy.',
        tipo: 'mensaje-error'
      });
    }

    // Valida la cama
    db.query(verificarCama, [camaId], (err2, resCama) => {
      if (err2) {
        console.error('Error al verificar cama:', err2);
        return res.render('mensaje', {
          mensaje: 'Error al verificar la cama.',
          tipo: 'mensaje-error'
        });
      }

      if (resCama.length > 0) {
        return res.render('mensaje', {
          mensaje: 'Esta cama ya está ocupada hoy.',
          tipo: 'mensaje-error'
        });
      }

      // Insertar internación
      const insertQuery = `
        INSERT INTO internaciones (paciente_id, cama_id)
        VALUES (?, ?)
      `;

      db.query(insertQuery, [pacienteId, camaId], (err3, result) => {
        if (err3) {
          console.error('Error al registrar internación:', err3);
          return res.render('mensaje', {
            mensaje: 'Error al internar al paciente.',
            tipo: 'mensaje-error'
          });
        }

        return res.render('mensaje', {
          mensaje: 'Paciente internado correctamente.',
          tipo: 'mensaje-ok'
        });
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