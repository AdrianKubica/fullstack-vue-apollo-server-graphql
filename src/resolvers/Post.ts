export const Post = {
  async createdBy(parent: any, args: any, { UserModel }: any, info: any) {
    const user = await UserModel.findById(parent.createdBy)
    return user
  },
}
