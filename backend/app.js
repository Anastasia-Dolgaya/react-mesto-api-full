const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { cors } = require('cors');
const errorsHandler = require('./middlewares/errorsHandler');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { cors } = require('./middlewares/cors');
const allowedCors = [
  'http://localhost:3000',
  'http://leela.mesto.nomoredomains.club',
  'https://leela.mesto.nomoredomains.club',
];

const { PORT = 3000 } = process.env;

const app = express();
// app.use(cors);

app.enable('trust proxy');

app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    origin: allowedCors,
    exposedHeaders: ['Link'],
  }),
);

app.options('*', cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
