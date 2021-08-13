import { Controller } from 'egg';
import { ProductModel } from '../model/Product';
export default class BasicController extends Controller {

    // 验证登录并且生成 token
    public async info() {
        const { ctx } = this;

        // const { product_type } = ctx.request.query;

        let result

        // if (product_type) {
        //     result = await ProductModel.find().where('product_type').equals(product_type)
        // }
        // else {
        //     result = await ProductModel.find()
        // }
        const options = {
            page: 1,
            limit: 1,

        };
        const query = {
            product_type: '力量站'
        }
        result = await ProductModel.paginate(query, options)
        ctx.body = {
            code: 0,
            message: '登录成功',
            data: result,
        }
    };


}