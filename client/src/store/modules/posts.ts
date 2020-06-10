import store from "@/store"
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators"
import { apolloClient } from "../../main"
import { GET_POSTS } from "@/queries/queries"

@Module({ dynamic: true, store, namespaced: true, name: "posts" })
export default class Posts extends VuexModule {
  posts = []

  @Mutation
  setPosts(posts: []) {
    this.posts = posts
  }

  @Action({ commit: "setPosts" })
  async getPosts() {
    const { data } = await apolloClient.query({
      query: GET_POSTS,
    })
    return data.posts
  }
}

export const PostModule = getModule(Posts)
