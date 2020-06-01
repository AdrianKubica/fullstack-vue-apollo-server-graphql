import {
  prop,
  buildSchema,
  addModelToTypegoose,
  arrayProp,
  Ref,
} from "@typegoose/typegoose"
import mongoose from "mongoose"
import { User } from "./User"
import { Message } from "./Message"

export class Post {
  @prop({ required: true })
  title!: string

  @prop({ required: true })
  imageUrl!: string

  @prop({ required: true })
  categories!: string[]

  @prop({ required: true })
  description!: string

  @prop({ default: 0 })
  likes!: number

  @prop({ required: true, ref: "User" })
  createdBy!: Ref<User>

  @arrayProp({ required: true, ref: "Message" })
  messages!: Ref<Message>[]
}

const postSchema = buildSchema(Post, {
  timestamps: true,
})

export const PostModel = addModelToTypegoose(
  mongoose.model("Post", postSchema),
  Post
)
