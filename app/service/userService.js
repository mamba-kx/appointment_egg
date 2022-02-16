"use strict";
const crypto = require("../extend/crypto");
// 操作数据库
const Service = require("egg").Service;

class userService extends Service {
  async register() {
    const { name, phone, idcard } = this.ctx.request.body;
    // 查重
    const queryRes = await this.app.mysql.get("user", { name, phone, idcard });
    console.log("queryRes", queryRes);
    if (queryRes) {
      return await this.ctx.helper.errorModule("用户已存在");
    }
    // 注册
    const insertRes = await this.app.mysql.insert("user", {
      token: crypto("24"),
      name,
      phone,
      idcard,
    });
    console.log("注册成功", insertRes);
    return await this.ctx.helper.successModule("注册成功");
  }
  async login() {
    const { name, phone, idcard } = this.ctx.request.body;

    const queryUserRes = await this.app.mysql.select("user", {
      where: {
        name: name,
      },
    });
    console.log("查询结果", queryUserRes[0].name);

    if (!queryUserRes.length) {
      return await this.ctx.helper.successModule("用户名不存在");
    }

    if (queryUserRes[0].phone !== phone) {
      return await this.ctx.helper.successModule("手机号不正确");
    }

    if (queryUserRes[0].idcard !== idcard) {
      return await this.ctx.helper.successModule("身份证号不正确");
    }

    return await this.ctx.helper.successModule("登陆成功", {
      token: crypto("24"),
    });
  }
}

module.exports = userService;
