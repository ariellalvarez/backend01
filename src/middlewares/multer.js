import multer from "multer";
import { __dirname } from "../path.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
  
    cb(null, file.originalname)
  },
});

export const upload = multer({ storage: storage });