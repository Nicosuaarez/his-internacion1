const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { titulo: 'Bienvenido al sistema HIS de internacion'});
});

module.exports = router;
