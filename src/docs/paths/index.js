import user from './user.js';
import song from './song.js';
import album from './album.js';
import role from './role.js';
import artist from './artist.js';
import playlist from './playlist.js';

export default {
  ...user,
  ...song,
  ...album,
  ...role,
  ...artist,
  ...playlist,
};
