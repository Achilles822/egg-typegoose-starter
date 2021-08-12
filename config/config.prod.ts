import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mongoose = {
    url: 'mongodb://admin_gymgest:JgEsb10rf5IW6t3F@mongodb001-replprod001.gz.cvte.cn:27017,mongodb002-replprod001.gz.cvte.cn:27017,mongodb003-replprod001.gz.cvte.cn:27017/gymgest?replicaSet=Replprod001',
    options: { useUnifiedTopology: true, useNewUrlParser: true },
  };

  return config;
};
