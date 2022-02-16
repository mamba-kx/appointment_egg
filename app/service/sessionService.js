"use strict";

const Service = require("egg").Service;

class SessionService extends Service {
  // 获取场次详细日期
  async sessionDayList() {
    const sessionDayListRes = await this.app.mysql.select("session");
    return await this.ctx.helper.successModule(
      "获取场次列表成功",
      sessionDayListRes
    );
  }

  // 场次预约
  async sessionAppointment() {
    const { id, name } = this.ctx.request.body;

    // 查询该用户是预约
    const queryIsAppointment = await this.app.mysql.select("user");
    if (queryIsAppointment[0].isAppointment) {
      return await this.ctx.helper.successModule("您已预约", [], 5001);
    }

    // 查询数据库该场次当前预约人数
    const sessionCurrentPeople = await this.app.mysql.select("session", {
      where: {
        id: id,
      },
    });
    console.log("该场次当前预约人数", sessionCurrentPeople[0].currentPeople);
    const currentPeople = sessionCurrentPeople[0].currentPeople;
    const sessionTime = sessionCurrentPeople[0].sessionTime;
    if (currentPeople >= 200) {
      return await this.ctx.helper.successModule("当前场次以约满", [], 5002);
    }

    // 更新数据库session表信息  id为主键 将会根据主键 id 查找，并更新
    const sessionAppointmentRes = await this.app.mysql.update("session", {
      id: id,
      currentPeople: sessionCurrentPeople[0].currentPeople + 1,
    });
    if (sessionAppointmentRes.affectedRows === 1) {
      console.log("session表更新成功");
      // 更新数据库user表信息
      const updateUserInfoRes = await this.app.mysql.update(
        "user",
        {
          isAppointment: 1,
          appointmentSession: sessionTime,
        },
        {
          where: {
            name: name,
          },
        }
      );

      console.log("预约成功", updateUserInfoRes);
      if (updateUserInfoRes.affectedRows === 1) {
        return await this.ctx.helper.successModule(
          "预约成功",
          sessionCurrentPeople[0]
        );
      }
    }
  }

  // 取消预约
  async cancelSessionAppointment() {
    const { id, name } = this.ctx.request.body;
    // 获取当前session表currentPeople字段值
    const getCurrentPeopleRes = await this.app.mysql.select("session", {
      where: {
        id: id,
      },
      columns: ["currentPeople"],
    });
    const currentPeople = getCurrentPeopleRes[0].currentPeople
    console.log("当前预约人数", currentPeople);

    // 更新user表状态
    const cancelAppointmentRes = await this.app.mysql.update(
      "user",
      {
        isAppointment: 0,
      },
      {
        where: {
          name: name,
        },
      }
    );
    console.log(cancelAppointmentRes);
    if (cancelAppointmentRes.affectedRows === 1) {
      // 更新session表状态
      const cancelSessionAppointmentRes = await this.app.mysql.update(
        "session",
        {
          id: id,
          currentPeople: currentPeople - 1,
        }
      );

      return await this.ctx.helper.successModule("取消预约成功");
    }
  }
}
module.exports = SessionService;
