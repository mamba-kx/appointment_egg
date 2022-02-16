"use strict";

function successModule(msg = "操作成功", data, code = 200) {
  return {
    msg,
    data,
    code
  };
}

function errorModule(msg = "操作失败", data) {
  this.ctx.status = 400;
  return {
    msg,
    data,
    code: 400,
  };
}

function lackModule(data, code) {
  this.ctx.status = 403;
  return {
    detail: `缺少${data}参数`,
    code: 403,
  };
}

module.exports = {
  successModule,
  errorModule,
  lackModule,
};
