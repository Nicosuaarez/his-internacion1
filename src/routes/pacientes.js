const express = require('express');
const router = express.Router();

router.get('/nuevo', (req, res) => {
    res.render('pacientes/nuevo');
});

module.exports = router;