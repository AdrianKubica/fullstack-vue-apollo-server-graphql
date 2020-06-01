export const Mutation = {
  async signupUser(parent: any, { username, password, email }: any, { UserModel }: any, info: any) {
    const user = await UserModel.findOne({ $or: [{ username }, { email }] })
    if (user) {
      throw new Error("User or email already exists")
    }
    const newUser = await new UserModel({ username, password, email }).save()
    return newUser
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
