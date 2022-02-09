const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('-------------------')
  console.log('Banco de dados conectado 🌎');
  console.log('-------------------')
}).catch((err) => console.log(err));

const app = express();

// middlewares globais

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

// app.use('/api/v1/', router);

app.listen(8800, () => {
  console.log('-------------------')
  console.log('Backend Iniciado 🌍');
  console.log('-------------------')
});