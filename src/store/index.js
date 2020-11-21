import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import specification from "./modules/specification/";

export default new Vuex.Store({
  modules: { specification },
});
