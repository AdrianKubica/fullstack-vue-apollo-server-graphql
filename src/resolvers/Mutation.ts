import bcrypt from "bcrypt"
import config from "config"

const secret = process.env.SECRET || config.get<string>("app.SECRET")

export const Mutation = {
  async signinUser(parent: any, { username, password }: any, { UserModel }: any, info: any) {
    const user = await UserModel.findOne({ username })
    if (!user) {
      throw new Error("User not found or incorrect password")
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new Error("User not found or incorrect password")
    }
    return { token: user.generateAuthToken(secret, "1hr") }
  },

  async signupUser(parent: any, { username, password, email }: any, { UserModel }: any, info: any) {
    const user = await UserModel.findOne({ $or: [{ username }, { email }] })
    if (user) {
      throw new Error("User or email already exists")
    }
    const newUser = await new UserModel({ username, password, email }).save()
    return { token: newUser.generateAuthToken(secret, "1hr") }
  },

  async addPost(
    parent: any,
    { title, imageUrl, categories, description, createdBy }: any,
    { PostModel, UserModel }: any,
    info: any
  ) {
    const user = await UserModel.findById(createdBy)
    if (!user) {
      throw new Error(`Bad request`)
    }
    const newPost = await new PostModel({ title, imageUrl, categories, description, createdBy }).save()
    return newPost
  },
}
