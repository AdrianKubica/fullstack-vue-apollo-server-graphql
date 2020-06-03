import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "@babel/polyfill"

import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"

Vue.use(VueApollo)

export const apolloClient = new ApolloClient({
  uri: "/graphql",
})

const apolloProvider = new VueApollo({ defaultClient: apolloClient })

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
