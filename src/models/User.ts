import { prop, buildSchema, addModelToTypegoose, arrayProp, Ref, DocumentType, pre } from "@typegoose/typegoose"
import validator from "validator"
import mongoose from "mongoose"
import { Post } from "./Post"
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

@pre<User>("save", function (next) {
  const user = this
  user.avatar = `http://gravatar.com/avatar/${uuid()}?d=identicon`
  next()
})
@pre<User>("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
    } catch (err) {
      return next(err)
    }
  }

  next()
})
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

  public async generateAuthToken(this: DocumentType<User>, secret: string, expiresIn: string) {
    const user = this
    const token = jwt.sign({ id: user.id.toString() }, secret, { expiresIn })
    return token
  }
}

const userSchema = buildSchema(User, {
  timestamps: true,
})

export const UserModel = addModelToTypegoose(mongoose.model("User", userSchema), User)
