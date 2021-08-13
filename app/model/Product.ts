import BaseModel from './BaseModel';
import { getModelForClass, prop, plugin} from '@typegoose/typegoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';

type PaginateMethod<T> = (
    query?: FilterQuery<T>,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<T>) => void,
) => Promise<PaginateResult<T>>;


@plugin(mongoosePaginate)
export default class Product extends BaseModel {

    static paginate: PaginateMethod<Product>;

    @prop({ required: true })
    language: string;

    @prop({ required: true })
    product_type?: string;

    @prop()
    model?: string;

    @prop()
    model_photo?: string;

    @prop()
    model_photo_small?: string;

    @prop()
    images?: object[];

}


export const ProductModel = getModelForClass(Product);
