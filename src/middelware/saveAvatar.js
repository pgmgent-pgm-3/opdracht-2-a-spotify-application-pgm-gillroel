import path from 'path';

import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_PATH } from '../consts.js';

export const saveAvatar = async (req, res, next) => {
  // get the file out our request

  const { file } = req;

  if (!file) return next;

  // validate incoming
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    const ext = file.originalname.split('.').pop();

    await sharp(file.buffer)
      .resize(128, 128, {
        fit: sharp.fit.cover,
        withoutEnlargement: true,
      })
      .toFile(`${PUBLIC_PATH}/img/avatars/${uuidv4()}.${ext}`);

    // go to the next chain
    next();
  } else {
    console.error('the given file was incorrect');
  }
};
