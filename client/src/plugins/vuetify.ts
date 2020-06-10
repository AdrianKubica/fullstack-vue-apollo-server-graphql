import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import pl from "vuetify/src/locale/pl"

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pl },
    current: "pl",
  },
  theme: {
    themes: {
      light: {
        primary: "#341255",
        secondary: "#7F54B7",
        accent: "#B65A38",
        error: "#D32F2F",
        warning: "#FFC107",
        info: "#2196f3",
        success: "#4caf50",
      },
    },
  },
})
