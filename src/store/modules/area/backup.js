import * as types from "./mutation-types";
import axios from "./../../../plugins/axios";
import Vue from "vue";

const URL = process.env.VUE_APP_API_SPECIFICATION_URL;

const state = {
  areas: [],
  areaInputs: [],
  partInputs: [],
  request: { area: {}, parts: {} },
  result: {},
  partCounter: 0,
};

const mutations = {
  [types.SET_AREA](state, payload) {
    state.areas = payload;
  },
  [types.SET_REQUEST_AREA](state, payload) {
    state.request.area = payload;
    state.request = { ...state.request };
  },
  [types.ADD_PART](state, payload) {
    let obj = { id: payload.id, length: payload.length, width: payload.width, quantity: payload.quantity };
    Vue.set(state.request.parts, payload.id, obj);
  },
  [types.DELETE_PART](state, id) {
    Vue.delete(state.request.parts, id);
  },
  [types.DELETE_ALL_PARTS](state) {
    state.request.parts = {};
    state.request = { ...state.request };
  },
  [types.SET_AREA_INPUTS](state, payload) {
    state.areaInputs = payload;
  },
  [types.SET_PART_INPUTS](state, payload) {
    state.partInputs = payload;
  },
  [types.INCREMENT_PART_COUNTER](state) {
    state.partCounter++;
  },
};

const actions = {
  areaLoadAreas({ commit }) {
    return axios.get(URL + "packaging/area/areas").then((response) => {
      commit(types.SET_AREA, response.data);
    });
  },
  areaLoadAreaInputs({ commit }) {
    return axios.get(URL + "packaging/area/areaInputs").then((response) => {
      commit(types.SET_AREA_INPUTS, response.data);
    });
  },
  areaLoadPartInputs({ commit }) {
    return axios.get(URL + "packaging/area/partInputs").then((response) => {
      commit(types.SET_PART_INPUTS, response.data);
    });
  },
  areaSetArea({ commit }, payload) {
    commit(types.SET_REQUEST_AREA, payload);
  },
  areaAddPart({ commit }, payload) {
    commit(types.ADD_PART, payload);
  },
  areaDeletePart({ commit }, id) {
    commit(types.DELETE_PART, id);
  },
  areaDeleteAllParts({ commit }) {
    commit(types.DELETE_ALL_PARTS);
  },
  areaIncrementPartCounter({ commit }) {
    commit(types.INCREMENT_PART_COUNTER);
  },
  calculateArea({ state }) {
    let obj = {};
    obj.area = state.request.area;
    obj.parts = state.request.parts;
    console.log(obj);
    return axios
      .post(URL + "packaging/area/calculateArea", obj)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  },
};

const getters = {
  areaGetAreas: (state) => {
    return state.areas;
  },
  areaGetArea: (state) => {
    state.request.area;
  },
  areaGetAreaInputs: (state) => {
    return state.areaInputs;
  },
  areaGetPartInputs: (state) => {
    return state.partInputs;
  },
  areaGetParts: (state) => {
    return state.request.parts;
  },
  areaGetPartCounter: (state) => {
    return state.partCounter;
  },
};

const areaModule = {
  state,
  mutations,
  actions,
  getters,
};

export default areaModule;
