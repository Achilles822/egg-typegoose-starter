// export default {
//   baseResponse: {
//     code: { type: "number", required: true },
//     message: { type: "string", required: true },
//     data: { type: "object" },
//   },
// };

// module.exports = {
//   baseResponse: {
//     code: { type: "number", required: true },
//     message: { type: "string", required: true },
//     data: { type: "object" },
//   },
// };
const baseResponse = {
  code: { type: "number", required: true },
  message: { type: "string", required: true },
  data: { type: "user", required: true },
};

export const extendsBaseResponse = function(data: any) {
  return {
    ...baseResponse,
    data,
  };
};

export const list = {
  username: {
    type: "array",
    itemType: "string",
    required: true,
    description: "用户姓名",
  },
  age: { type: "number", required: true, description: "年龄" },
};
export const listReponse = extendsBaseResponse({
  type: "list",
  required: true,
});
