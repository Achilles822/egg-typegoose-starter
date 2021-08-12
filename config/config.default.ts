import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572947163069_8100';

  // add your egg config in here
  config.middleware = [];

  config.cluster = {
    listen: {
      // path: '',
      port: 8080,
      // hostname: '0.0.0.0', //localhost
    }
  };

  config.modelWhitelist = ['BaseModel', 'Fee'];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mongoose = {
    url: 'mongodb://admin_gymgest:V56kB1hQRUwt3oVK@mongodb001-repltest001.gz.cvte.cn:27017,mongodb002-repltest001.gz.cvte.cn:27017,mongodb003-repltest001.gz.cvte.cn:27017/gymgest?replicaSet=Repltest001',
    options: { useUnifiedTopology: true, useNewUrlParser: true },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };

  config.jwt = {
    secret: "Gymgest"//自定义 token 的加密条件字符串
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
