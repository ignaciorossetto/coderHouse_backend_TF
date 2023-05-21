import multer from 'multer'
import __dirname from '../utils.js';
import fs from 'fs';
import fsExtra from 'fs-extra'
import config from '../config/config.js';

const profileImgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const id = req.user.user._doc._id
      const path = __dirname + `/public/multimedia/users_folder/${config.mode}/` + id + '/profile'
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const newName = file.originalname.replace(/\s/g, '_')
      const id = req.user.user._doc._id
      const path = __dirname + `/public/multimedia/users_folder/${config.mode}/` + id + '/profile'
      fsExtra.emptyDirSync(path)
      cb(null, newName);
    },
  });

const documentsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const id = req.user.user._doc._id
      const path = __dirname + `/users_folder/${config.mode}/` + id + '/documents' + '/' + req.params.file
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const newName = file.originalname.replace(/\s/g, '_')
      if (req.params.file === 'address' || req.params.file === 'accStatement') {
        const id = req.user.user._doc._id
        const path = __dirname + `/users_folder/${config.mode}/` + id + '/documents' + '/' + req.params.file
        fsExtra.emptyDirSync(path)
      }
      cb(null, newName);
    },
  });

const addProductImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.user._id || req.user.user._doc._id
    const path = __dirname + `/public/multimedia/users_folder/${config.mode}/` + id + '/products'
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const newName = file.originalname.replace(/\s/g, '_')
    cb(null, newName);
  },
})

export const uploadProfileImg = multer({ storage: profileImgStorage });
export const uploadDocs = multer({ storage: documentsStorage });
export const uploadProductsImage = multer({ storage: addProductImage });

export default uploadProfileImg