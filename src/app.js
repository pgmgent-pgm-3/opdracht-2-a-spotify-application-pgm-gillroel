import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import swaggerUiExpress from 'swagger-ui-express';
import { home } from './controllers/home.js';
import { SOURCE_PATH } from './consts.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import entities from './models/index.js';
import {
  deleteUser,
  getUser,
  getUserById,
  postUser,
  updateUsers,
} from './controllers/api/user.js';
import {
  login,
  logout,
  postLogin,
  postRegister,
  register,
} from './controllers/authentication.js';
import authentication from './middelware/validation/authentication.js';
import { getRole, postRole } from './controllers/api/role.js';

import { saveAvatar } from './middelware/saveAvatar.js';
import { jwtAuth } from './middelware/jwtAuth.js';

import swaggerDefinition from './docs/swagger.js';
import {
  deleteSong,
  getSong,
  getSongById,
  postSong,
  updateSong,
} from './controllers/api/song.js';
import {
  deleteAlbum,
  getAlbum,
  getAlbumById,
  postAlbum,
} from './controllers/api/album.js';
import {
  deleteArtist,
  getArtist,
  getArtistById,
  postArtist,
  updateArtist,
} from './controllers/api/artist.js';
import {
  deletePlaylist,
  getPlaylist,
  getPlaylistById,
  postPlaylist,
  postSongToPlaylist,
  updatePlaylist,
} from './controllers/api/playlist.js';
import { account } from './controllers/account.js';
import {
  addAlbum,
  addArtist,
  addPlaylist,
  addSong,
  addSongToPlaylist,
  admin,
} from './controllers/admin.js';
import { artist } from './controllers/artist.js';
import { playlist } from './controllers/playlist.js';
import { editor } from './controllers/editor.js';

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
app.get('/', jwtAuth, home);
app.get('/admin', jwtAuth, admin);
app.get('/account', jwtAuth, account);
app.get('/artist', jwtAuth, artist);
app.get('/playlist', jwtAuth, playlist);
app.get('/editor', jwtAuth, editor);

app.get('/register', register);
app.get('/login', login);
app.post(
  '/register',
  ...authentication,
  postRegister,
  multer().single('avatar'),
  saveAvatar,
  register
);
app.post('/login', ...authentication, postLogin, login);
app.post('/logout', logout);

app.get('/api/users', getUser);
app.get('/api/user/:id', getUserById);
app.post('/api/user', postUser);
app.put('/api/user', updateUsers);
app.delete('/api/user/:id', deleteUser);

app.get('/api/roles', getRole);
app.post('/api/role', postRole);

app.get('/api/songs', getSong);
app.get('/api/song/:id', getSongById);
app.post('/api/song', postSong);
app.put('/api/song', updateSong);
app.delete('/api/song/:id', deleteSong);

app.get('/api/albums', getAlbum);
app.get('/api/album/:id', getAlbumById);
app.post('/api/album', postAlbum);
app.put('/api/album', updateSong);
app.delete('/api/album/:id', deleteAlbum);

app.get('/api/artists', getArtist);
app.get('/api/artist/:id', getArtistById);
app.post('/api/artist', postArtist);
app.put('/api/artist', updateArtist);
app.delete('/api/artist/:id', deleteArtist);

app.get('/api/playlist', getPlaylist);
app.get('/api/playlists/:id', getPlaylistById);
app.post('/api/playlist', postPlaylist);
app.put('/api/playlists', updatePlaylist);
app.delete('/api/playlists/:id', deletePlaylist);

app.post('/addPlaylist', addPlaylist);
app.post('/addSong', addSong);
app.post('/addAlbum', addAlbum);
app.post('/api/playlists/addSong', postSongToPlaylist);
app.post('/addSongToPlaylist', addSongToPlaylist);
app.post('/addArtist', addArtist);

// adding swagger documentation
app.use(
  '/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDefinition)
);

// app.post('/uploadAvatar', multer().single('avatar'), saveAvatar, (req, res) => {
//   res.redirect('/');
// });

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
