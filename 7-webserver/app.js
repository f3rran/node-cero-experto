const express = require('express')
const app = express()
const port = 3000;

// Middleware servir contenido estático
app.use(express.static('public'));

app.get('/hola-mundo', function (req, res) {
    res.send('Hola mundo - Página de Hola Mundo')
});

  app.get('*', function (req, res) {
    res.send('404 | ¡Página no encontrada!')
});
 
app.listen(port, () => {
    console.log(`Aplicación correindo en el puerto: ${port}`);
})