const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/geckos';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const db = mongoose.connection;

const storage = new GridFsStorage({
  db: db,
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg'];
    console.log(req.body)
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return { filename};
    }

    return {
      bucketName: 'photos',
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
