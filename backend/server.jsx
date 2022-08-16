const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
app.use(cors());

app.get('/api/photo', (req, res) => {
  res.send(fs.readdirSync('public/img/photo'));
})

app.get('/api/audio', (req, res) => {
  res.send(fs.readdirSync('public/audio/audio__play'));
})


app.listen(4000, ()=> {

})