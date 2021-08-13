import 'egg'
import { InstanceType, ModelType } from 'typegoose'
import * as mongoose from 'mongoose'

import BaseModel from '../app/model/BaseModel'
import Product from '../app/model/Product'
import Student from '../app/model/Student'
import User from '../app/model/User'

declare module 'egg' {
  interface Context {
    connection: mongoose.Collection
    model: {
      BaseModel: ModelType<InstanceType<BaseModel>>
      Product: ModelType<InstanceType<Product>>
      Student: ModelType<InstanceType<Student>>
      User: ModelType<InstanceType<User>>
    }
  }
}
