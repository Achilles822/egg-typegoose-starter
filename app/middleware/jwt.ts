module.exports = () => {
    return async function jwt(ctx, next) {
        console.log(ctx.request.header)
        const token = ctx.request.header.authorization;
        if (token) {
            try {
                ctx.app.jwt.verify(token.substring(7), ctx.app.config.jwt.secret);
                await next();
            } catch (error) {
                ctx.status = 401;
                ctx.body = {
                    massage: 'token已过期，请重新登录',
                    code: -1,
                }
                return;
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                message: 'token不存在',
            };
            return;
        }
    }
}