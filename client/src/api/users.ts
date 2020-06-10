import { apolloClient } from "../main"
import { SIGNIN_USER } from "../queries/queries"

export class UserAPI {
  static async signinUser({ username, password }: any) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: SIGNIN_USER,
        variables: {
          username,
          password,
        },
      })
      console.log(data.signinUser)
    } catch (err) {
      console.log(err)
    }
  }
}
