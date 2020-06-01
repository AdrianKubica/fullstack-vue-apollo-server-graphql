import { prop, buildSchema, addModelToTypegoose, arrayProp, Ref, DocumentType } from "@typegoose/typegoose"
import validator from "validator"
import mongoose from "mongoose"
import { Post } from "./Post"

export class User {
  @prop({ required: true, unique: true })
  username!: string

  @prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value)
      },
      message: "Email is not valid",
    },
  })
  email!: string

  @prop({
    required: true,
    trim: true,
    validate: [
      {
        validator(value) {
          return value.length > 6
        },
        message: "Password should be longer than 6 characters",
      },
      {
        validator(value) {
          return !value.toLowerCase().includes("password")
        },
        message: "Password should not contain 'password'",
      },
    ],
  })
  password!: string

  @prop()
  avatar!: string

  @arrayProp({
    ref: "Post",
    required: true,
  })
  favorites!: Ref<Post>[]
}

const userSchema = buildSchema(User, {
  timestamps: true,
})

export const UserModel = addModelToTypegoose(mongoose.model("User", userSchema), User)
