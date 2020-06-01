<template>
  <v-container>
    <h1>Home</h1>
    <ul>
      <li v-for="(post, index) in posts" :key="index">{{ post.title }}</li>
    </ul>
    <v-btn color="primary" @click="showData">CLICK</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postsQuery } from "../queries/queries"

@Component({
  apollo: {
    posts: {
      query: postsQuery,
      // skip: true,
    },
  },
})
export default class Home extends Vue {
  private posts = ""

  // this.$apollo.queries.posts.skip = false
  // const results = await this.$apollo.queries.posts.refetch()

  async showData() {
    //   const results = await this.$apollo.query({ query: postsQuery })
    //   console.log(results.data.posts)
  }
}
</script>
