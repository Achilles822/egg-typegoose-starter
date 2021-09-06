import { extendsBaseResponse } from "./index";

export const createUserRequest = {
  //   username: { type: "string", required: true, description: "用户姓名" },
  //   age: { type: "number", required: true, description: "年龄" },

  mobile: {
    type: "string",
    required: true,
    description: "手机号",
    example: "18801731528",
    format: /^1[34578]\d{9}$/,
  },
  password: {
    type: "string",
    required: true,
    description: "密码",
    example: "111111",
  },
  realName: {
    type: "string",
    required: true,
    description: "姓名",
    example: "Tom",
  },
};
export const userReponse = extendsBaseResponse({
  type: "user",
  required: true,
});
