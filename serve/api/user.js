//user.js
const express = require("express");
const db = require("../db/mysql.js");
const router = express.Router();
const config = require("../config/index")
const jwt = require('jsonwebtoken');
Guid = require('guid');

// 中间件函数，用于验证JWT令牌
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user.user;
    next();
  });
}

/**
 * 用户登录
 */
router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  var sql = "select * from lbp_user where account =@username and password = @password";
  try {
    var result = await db.querySql(sql, { username, password });
    if (result.recordset.length != 0) {
      var user = result.recordset[0]
      // 创建JWT令牌
      const token = jwt.sign({ userId: user.id, user }, config.secretKey, { expiresIn: '8h' });
      res.send({
        code: config.stateCode.success,
        data: user,
        token
      });

    } else {
      res.send(config.apiError('账号或密码错误'));
    }
  }
  catch (e) {
    res.send(config.apiError(e.toString()));
  }
});

/**
 * 获取用户信息
 */
router.get('/getUserInfo', authenticateToken, (req, res) => {
  res.send({
    code: config.stateCode.success,
    data: req.user
  })
});

/**
 * 获取侧边栏菜单数据
 */
router.post("/getMenu", authenticateToken, async function (req, res) {
  try {
    var data = await db.select("lbp_menu", "", "", {}, "order by order_by asc")
    res.send({
      code: config.stateCode.success,
      data: data.recordset
    })
  }
  catch (e) {
    res.send(config.apiError(e.toString()));
  }
})

/**
 * 删除菜单
 */
router.post("/deleteMenu", authenticateToken, async function (req, res) {
  const { id } = req.body;
  try {

    var { recordset } = await db.del("where id = @id", { id: id }, 'lbp_menu')
    if (!recordset) {
      var MenuData = await db.select("lbp_menu", "", "", {}, "order by sn desc")
      res.send({
        code: config.stateCode.success,
        data: MenuData.recordset
      })
    } else {
      res.send({
        code: config.stateCode.error,
        message: '当前数据不存在'
      })
    }

  }
  catch (e) {
    res.send(config.apiError(e.toString()));
  }
})

/**
 * 修改菜单数据
 */
router.post("/editMenu", authenticateToken, async function (req, res) {
  const { label, path, page_type, status, order_by, parent_id, icon, title, id } = req.body;
  try {
    var sqlParams = {
      label,
      path,
      page_type,
      status,
      order_by,
      title,
    }
    if (parent_id) {
      sqlParams.parent_id = parent_id
      sqlParams.icon = icon
    }
    var { recordset } = await db.update(sqlParams, { id }, "lbp_menu")
    if (!recordset) {
      var MenuData = await db.select("lbp_menu", "", "", {}, "order by order_by asc")
      res.send({
        code: config.stateCode.success,
        data: MenuData.recordset
      })
    } else {
      res.send({
        code: config.stateCode.error,
        message: '修改失败~'
      })
    }

  }
  catch (e) {
    res.send(config.apiError(e.toString()));
  }
})

/**
 * 添加菜单
 */
router.post("/addMenu", authenticateToken, async function (req, res) {
  const { label, path, page_type, status, order_by, parent_id, icon, title } = req.body;
  try {
    var id = Guid.create().value;
    var sqlParams = {
      label,
      path,
      page_type,
      status,
      order_by,
      title,
      id
    }
    if (parent_id) {
      sqlParams.parent_id = parent_id
      sqlParams.icon = icon
    }
    var { recordset } = await db.add(sqlParams, "lbp_menu")
    if (recordset) {
      var MenuData = await db.select("lbp_menu", "", "", {}, "order by order_by asc")
      res.send({
        code: config.stateCode.success,
        data: MenuData.recordset
      })
    } else {
      res.send({
        code: config.stateCode.error,
        message: '添加失败~'
      })
    }

  }
  catch (e) {
    res.send(config.apiError(e.toString()));
  }
})

module.exports = router;
