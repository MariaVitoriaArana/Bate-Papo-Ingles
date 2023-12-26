const express = require('express');
const app = express ();
const port = 3000;

app.use(express.static(__dirname + '/entrada.html'));

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/entrada.html');
});

app.listen(port, ()=> console.log(`executando a porta ${port}!`));