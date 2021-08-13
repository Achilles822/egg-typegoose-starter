import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mongoose = {
    url: '127.0.0.1:27017',
    options: { useUnifiedTopology: true, useNewUrlParser: true },
  };

  return config;
};
