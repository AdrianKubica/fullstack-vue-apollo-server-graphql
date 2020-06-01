import mongoose from "mongoose"
import config from "config"

const connectionURL = process.env.MOGODB_URL || config.get<string>("db.MONGO_URL")

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, () => {
  console.log("DB connected")
}).catch(err => {
  console.log(err)
})
