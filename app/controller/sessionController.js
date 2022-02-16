"use strict";

const Controller = require("egg").Controller;

class sessionController extends Controller {
  // 场次信息列表
  async sessionDayList() {
    this.ctx.body = await this.ctx.service.sessionService.sessionDayList();
  }
  // 场次预约
  async sessionAppointment() {
    // 校验参数
    const { ctx } = this;
    try {
      ctx.validate({
        id: { type: "int" },
        name: { type: "string" },
      });

      ctx.body = await ctx.service.sessionService.sessionAppointment();
    } catch (error) {
      console.log(error.errors);
      const errors = error.errors;
      if (errors.length) {
        errors.forEach((item) => {
          ctx.body = ctx.helper.lackModule(item.field);
        });
      }
    }
  }
  // 取消预约
  async cancelSessionAppointment() {
    // 校验参数
    const { ctx } = this;
    try {
      ctx.validate({
        id: { type: "int" },
        name: { type: "string" },
      });

      ctx.body = await ctx.service.sessionService.cancelSessionAppointment();
    } catch (error) {
      console.log("取消预约错误", error);
      const errors = error.errors;
      if (errors.length) {
        errors.forEach((item) => {
          ctx.body = ctx.helper.lackModule(item.field);
        });
      }
    }
  }
}

module.exports = sessionController;
