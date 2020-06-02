import { gql } from "apollo-boost"

export const postsQuery = gql`
  query {
    posts {
      title
      imageUrl
      categories
      description
      likes
    }
  }
`
