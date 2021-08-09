import 'egg'
import { InstanceType, ModelType } from 'typegoose'
import * as mongoose from 'mongoose'

import BaseModel from '../app/model/BaseModel'
import Student from '../app/model/Student'
import User from '../app/model/User'

declare module 'egg' {
  interface Context {
    connection: mongoose.Collection
    model: {
      BaseModel: ModelType<InstanceType<BaseModel>>
      Student: ModelType<InstanceType<Student>>
      User: ModelType<InstanceType<User>>
    }
  }
}
