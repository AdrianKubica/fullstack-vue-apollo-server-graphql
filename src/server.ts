import { ApolloServer } from "apollo-server"
import "./db/moongoose"
import { resolvers } from "./resolvers/resolvers"
import config from "config"
import path from "path"
import fs from "fs"
import { models } from "./models/models"

const port = process.env.port || config.get<number>("app.PORT")

const schemaPath = path.join(__dirname, "schema.gql")
const typeDefs = fs.readFileSync(schemaPath, "utf-8")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    ...models,
  },
})

server.listen({ port }, () => {
  console.log(`Server is running on port ${port}`)
})
