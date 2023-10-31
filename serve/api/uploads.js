//读取静态资源
const express = require("express");
const router = express.Router();
let fs = require('fs')

// 读取静态资源
router.get('/:path', function (req, res, next) {
  var path = req.params.path
  fs.readFile(`./uploads/${path}`, function (err, data) {
    res.end(data)
  })
})

module.exports = router;
