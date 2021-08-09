import { Controller } from 'egg';
import { UserModel } from '../model/User';
export default class UserController extends Controller {

    // 验证登录并且生成 token
    public async login() {
        const { ctx, app } = this;

        const data = ctx.request.body;
        const { username, password } = data
        const hasUser = await UserModel.findOne({ username })
        console.log(hasUser)
        // 进行验证 data 数据 登录是否成功
        //成功过后进行一下操作

        //生成 token 的方式
        const token = app.jwt.sign({
            username: username,
            password: password
        }, app.config.jwt.secret);

        ctx.body = {
            code: 0,
            message: '登录成功',
            data: {},
            token
        }
    };

    public async index() {

        const { ctx } = this;

        console.log(ctx.state.user);

        ctx.body = { code: 0, msg: '验证成功' };
    }
    public async register() {
        const ctx = this.ctx;

        const data = ctx.request.body;

        const { username, password } = data

        if (username && password) {
            const user = new UserModel();
            user.username = username;
            user.password = password;
            const res = await UserModel.create(user);
            ctx.body = res;
        }

    }
}