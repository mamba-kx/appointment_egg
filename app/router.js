"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.post("/user/register", controller.userController.register);
  router.post("/user/login", controller.userController.login);
  router.get("/session/date", controller.sessionController.sessionDayList);
  router.post("/session/appointment", controller.sessionController.sessionAppointment);
  router.post("/session/cancelAppointment", controller.sessionController.cancelSessionAppointment);

};
