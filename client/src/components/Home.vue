<template>
  <v-container text-center v-if="posts">
    <v-layout row>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
    <v-flex xs12>
      <v-carousel v-if="!loading && posts.length > 0" v-bind="{ cycle: true }" interval="3000">
        <v-carousel-item v-for="(post, index) in posts" :key="index" :src="post.imageUrl">
          <h1 id="carousel__title">{{ post.title }}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
    <!-- <h1>Home</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <ul v-else v-for="(post, index) in posts" :key="index">
      <li>
        {{ post.title }}
        {{ post.imageUrl }}
        {{ post.description }}
      </li>
      <li>{{ post.likes }}</li>
    </ul>
    <v-btn color="primary" @click="showData">CLICK</v-btn>
    <ApolloQuery :query="query">
      <template slot-scope="{ isLoading, result: { data, error } }">
        <div v-if="isLoading">isLoading</div>
        <div v-else-if="error">Error! {{ error.message }}</div>
        <ul v-else v-for="(post, index) in data.posts" :key="index">
          <li>{{ post.title }}</li>
        </ul>
      </template>
    </ApolloQuery> -->
    <v-btn @click="showData">CLICK</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postsQuery } from "../queries/queries"
import store from "../store"
import "vue-apollo"
import { PostModule } from "../store/modules/posts"

@Component({
  apollo: {
    posts: {
      query: postsQuery,
      skip: true,
      result(args) {
        // console.log(args)
      },
      error(err) {
        // console.log(err)
      },
    },
  },
})
export default class Home extends Vue {
  private posts = []
  private query = postsQuery
  private loading = false

  mounted() {
    this.handleGetCarouselPosts()
  }

  // this.$apollo.queries.posts.skip = false
  // const results = await this.$apollo.queries.posts.refetch()

  async showData() {
    const results = await this.$apollo.query({ query: postsQuery })
    // console.log(results.data.posts)
    // console.log(PostModule.posts)
  }

  async handleGetCarouselPosts() {
    this.loading = true
    this.posts = await PostModule.getPosts()
    this.loading = false
  }
}
</script>

<style>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
