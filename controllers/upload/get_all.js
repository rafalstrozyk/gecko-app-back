const PhotosFilesModel = require('../../database/models/ptotos_file');
const ChunksModel = require('../../database/models/photos_chunks');

const getAll = async (req, res, next) => {
  try {
    const fullResponse = [];
    await PhotosFilesModel.find({}, async (err, photos) => {
      if (err) {
        console.log(err);
      }
      for (photo of photos) {
        await ChunksModel.find({ files_id: photo._id }, (err, chunks) => {
          let fileData = [];
          if (err) {
            console.log(err);
          }
          for (chunk of chunks) {
            let newItem = { ...chunk };
            fileData.push(newItem._doc.data.toString('base64'));
          }
          let finalFile =
            'data:' +
            { ...photo }._doc.contentType +
            ';base64,' +
            fileData.join('');

          fullResponse.push({ ...photo._doc, imgUrl: finalFile });
        });
      }

      return res.json(fullResponse);
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

module.exports = getAll;
