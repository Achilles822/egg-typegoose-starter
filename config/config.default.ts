import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1572947163069_8100";

  // add your egg config in here
  config.middleware = ["logger"];

  config.cluster = {
    listen: {
      port: 5001,
    },
  };

  config.modelWhitelist = ["BaseModel"];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mongoose = {
    url: "mongodb://127.0.0.1:27017",
    // options: { useUnifiedTopology: true, useNewUrlParser: true },
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    credentials: true,
  };

  config.jwt = {
    secret: "jhnsz9c7", //自定义 token 的加密条件字符串
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.swaggerdoc = {
    dirScanner: "./app/controller",
    apiInfo: {
      title: "egg-swagger",
      description: "swagger-ui for egg",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    host: "host",
    basePath: "http://127.0.0.1:8080/api", // 应当与egg server host保持一致，否则会有跨域的问题
    swagger: {
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
