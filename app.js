const express = require ('express');
const path = require("path");
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true}));

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});

const pacientesRoutes = require('./routes/pacientes');
app.use('/pacientes', pacientesRoutes);