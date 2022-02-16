/* eslint valid-jsdoc: "off" */
"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  onerror: {
    // 发生异常时重定向到这个页面上
    errorPage: "/error.html";
  }
  notfound: {
    pageUrl: "/404.html";
  }
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    security: {
      csrf: false,
      // domainWhiteList: ["http://localhost:3000"],
      domainWhiteList: ["*"],
    },
    cors: {
      origin: "*",
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: "localhost",
        // 端口号
        port: "3306",
        // 用户名
        user: "root",
        // 密码
        password: "100203721ckx",
        // 数据库名
        database: "test",
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  });
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1638871069098_350";

  // add your middleware config here
  config.middleware = ["notFoundHandler"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
