import { info } from "../../utils/logger";
import { Context } from "egg";

module.exports = () => {
  return async function logger(ctx: Context, next) {
    const date = Date.now();

    const params =
      ctx.req.method?.toLowerCase() === "get" ? ctx.query : ctx.request.body;
    await next();
    info(`request headers ${JSON.stringify(ctx.header)}`);
    info(
      `request ${ctx.req.method?.toUpperCase()} ${
        ctx.req.url
      }、params: ${JSON.stringify(params)}、${Date.now() - date}ms`
    );
  };
};
