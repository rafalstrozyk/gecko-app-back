const GeckoModel = require('../database/models/gecko');
const PhotosFilesModel = require('../database/models/ptotos_file');
const ChunksModel = require('../database/models/photos_chunks');

const uploadFile = async (req, res) => {
  try {
    if (req.body.gecko_id.length === 24) {
      await GeckoModel.find({ _id: req.body.gecko_id }, (err, data) => {
        if (err) {
          console.log(err);
          ChunksModel.deleteMany({ files_id: req.file.id }).then(() =>
            console.log('Delete file chunks')
          );
          PhotosFilesModel.deleteOne({ _id: req.file.id }).then(() =>
            console.log('Delete file')
          );
          return res.json({ message: 'Something went wrong' });
        } else {
          if (data && data.length > 0) {
            GeckoModel.updateOne(
              { _id: req.body.gecko_id },
              {
                $push: { photos: [req.file.id] },
              },
              (err) => {
                if (err) {
                  return res.json({ message: 'Something went wrong' });
                }
              }
            );
          } else {
            ChunksModel.deleteMany({ files_id: req.file.id }).then(() =>
              console.log('Delete file chunks')
            );
            PhotosFilesModel.deleteOne({ _id: req.file.id }).then(() =>
              console.log('Delete file')
            );
            return res.json({ message: `${req.body.gecko_id} invalid` });
          }
        }
      });
    } else {
      await ChunksModel.deleteMany({ files_id: req.file.id }).then(() =>
        console.log('Delete file chunks')
      );
      await PhotosFilesModel.deleteOne({ _id: req.file.id }).then(() =>
        console.log('Delete file')
      );
      return res.json({ message: `${req.body.gecko_id} must chave 24 hars` });
    }

    if (req.file == undefined) {
      return res.json({ message: `You must select a file.` });
    }

    return res.json({ message: `File has been uploaded.` });
  } catch (error) {
    console.log(error);
    return res.json({ error: `Error when trying upload image: ${error}` });
  }
};

module.exports = uploadFile;
