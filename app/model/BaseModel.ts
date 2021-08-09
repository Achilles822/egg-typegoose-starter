import { prop, pre } from '@typegoose/typegoose';

/**
  * BaseModel
*/
@pre<BaseModel>('save', function (next) {
  if (!this.createdAt || this.isNew) {
    this.createdAt = this.updatedAt = new Date()
  } else {
    this.updatedAt = new Date()
  }
  next()
})

export default class BaseModel {

  _id?: string

  @prop()
  createdAt: Date

  @prop()
  updatedAt: Date
}

