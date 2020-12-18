import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import specification from "./modules/specification/";
import area from "./modules/area/";

export default new Vuex.Store({
  modules: { specification, area },
});
