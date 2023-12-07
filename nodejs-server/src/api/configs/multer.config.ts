import multer from "multer";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    // const ext = path.extname(file.originalname);
    // callback(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});
