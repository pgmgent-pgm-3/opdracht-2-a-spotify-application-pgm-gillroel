import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { home } from './controllers/home.js';
import { SOURCE_PATH } from './consts.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import entities from './models/index.js';
import { getUser, getUserById } from './controllers/api/user.js';
import { login, postRegister, register } from './controllers/authentication.js';
import authentication from './middelware/validation/authentication.js';
import { getRole, postRole } from './controllers/api/role.js';

const app = express();
app.use(express.static('public'));

// import cookie-parser
app.use(cookieParser());

// import the bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handlebars Init

const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

// App Routing

app.get('/', home);
app.get('/register', register);
app.get('/login', login);
app.post('/register', ...authentication, postRegister);

app.get('/api/user', getUser);
app.get('/api/user/:id', getUserById);
// app.post('/api/user', postUser);

app.get('/api/role', getRole);
app.post('/api/role', postRole);

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Application is runninig on http://localhost:${process.env.PORT}/.`
    );
  });
});
