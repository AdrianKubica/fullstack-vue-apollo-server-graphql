export const Query = {
  async users(parent: any, args: any, { UserModel }: any, info: any) {
    return await UserModel.find({})
  },
  async posts(parent: any, args: any, { PostModel }: any, info: any) {
    const posts = await PostModel.find({}).sort({ createdAt: "desc" }).populate({
      path: "createdBy",
      model: "User",
    })
    return posts
  },
}
