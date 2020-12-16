const express = require('express');
const router = express.Router();
const multer = require('multer');

// multer-optional
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}.png`);
  },
});
var upload = multer({ storage: storage }).single('profile_img');

// Router
router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    console.log(res.req.file);
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
