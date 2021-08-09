import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  // mongoose
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  // cors
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
};

export default plugin;
