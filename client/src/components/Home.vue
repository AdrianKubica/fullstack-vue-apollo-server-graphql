<template>
  <v-container>
    <h1>Home</h1>
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
    </ApolloQuery>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postsQuery } from "../queries/queries"
import "vue-apollo"

@Component({
  apollo: {
    posts: {
      query: postsQuery,
      // skip: true,
      result(args) {
        console.log(args)
      },
      error(err) {
        console.log(err)
      },
    },
  },
})
export default class Home extends Vue {
  private posts = []
  private query = postsQuery

  // this.$apollo.queries.posts.skip = false
  // const results = await this.$apollo.queries.posts.refetch()

  async showData() {
    const results = await this.$apollo.query({ query: postsQuery })
    console.log(results.data.posts)
  }
}
</script>
