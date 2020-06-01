import {
  prop,
  buildSchema,
  addModelToTypegoose,
  arrayProp,
  Ref,
} from "@typegoose/typegoose"
import mongoose from "mongoose"
import { User } from './User'

export class Message {
  @prop({ required: true })
  body!: string

  @prop({required: true, ref: 'User' })
  user!: Ref<User>
}

const messageSchema = buildSchema(Message, {
  timestamps: true,
})

export const MessageModel = addModelToTypegoose(
  mongoose.model("Message", messageSchema),
  Message
)