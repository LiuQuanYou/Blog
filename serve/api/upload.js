const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require('path');

// 设置存储引擎和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 上传的文件将会存储在 uploads/ 目录下
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 文件名将设置为时间戳加上原始文件扩展名
  }
});

// 创建multer实例，指定存储引擎和文件大小限制（如果需要）
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 限制文件大小为5MB
});



router.post('/img', upload.single('image'), (req, res) => {
  // req.file 包含上传的文件信息
  if (req.file) {
    res.send('文件上传成功！');
  } else {
    res.send('上传失败，请确保选择了正确的文件类型并且文件不超过5MB。');
  }
});

module.exports = router;
