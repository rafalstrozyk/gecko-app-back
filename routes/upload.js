const express = require('express');
const router = express.Router();
const upload = require('../controllers/upload_photo');
const uploadFileStorage = require('../database/uploadFilesStorage');
const get_all = require('../controllers/upload/get_all');
const get_by_id = require('../controllers/upload/get_by_id');

router.get('/', get_all);

router.post('/', uploadFileStorage.single('file'), upload);

router.get('/id', get_by_id)

module.exports = router;
