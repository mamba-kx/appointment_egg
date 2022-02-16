"use strict";

// 处理前端传递过来的数据
const Controller = require("egg").Controller;

class HomeController extends Controller {
  // 注册
  async register() {
    console.log(this.ctx.request.body);
    const { ctx } = this;
    try {
      ctx.validate({
        name: { type: "string" },
        phone: { type: "phone" },
        idcard: { type: "idcard" },
      });
      ctx.body = await ctx.service.userService.register();
    } catch (error) {
      console.log("error", error);
      const errors = error.errors;
      if (errors.length) {
        errors.forEach((item) => {
          ctx.body = ctx.helper.lackModule(item.field);
        });
      }
    }
  }
  // 登陆
  async login() {
    const { ctx } = this;
    try {
      ctx.validate({
        name: { type: "string" },
        phone: { type: "phone" },
        idcard: { type: "idcard" }
      });
      ctx.body = await this.ctx.service.userService.login();
    } catch (error) {
      const errors = error.errors;
      if (errors.length) {
        errors.forEach((item) => {
          ctx.body = ctx.helper.lackModule(item.field);
        });
      }
    }
  }
}

module.exports = HomeController;
