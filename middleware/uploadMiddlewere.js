import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Generate a unique filename
  },
});
const upload = multer({ storage });

export default upload;