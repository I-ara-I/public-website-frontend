import * as types from "./mutation-types";
import axios from "./../../../plugins/axios";
import Vue from "vue";

const URL = process.env.VUE_APP_API_SPECIFICATION_URL;

const state = {
  selectableAreas: [],
  areaInputFields: [],
  partInputFields: [],
  areaValues: {},
  parts: {},
  partCounter: 0,
  result: {},
};

const mutations = {
  [types.SET_SELECTABLE_AREAS](state, areas) {
    state.selectableAreas = areas;
  },
  [types.SET_AREA_VALUE](state, { key, value }) {
    Vue.set(state.areaValues, key, value);
  },
  [types.SET_AREA_INPUT_FIELDS](state, inputs) {
    state.areaInputFields = inputs;
  },
  [types.SET_PART_INPUT_FIELDS](state, inputs) {
    state.partInputFields = inputs;
  },
  [types.ADD_PART](state, { key, value }) {
    Vue.set(state.parts, key, value);
  },
  [types.DELETE_PART](state, key) {
    Vue.delete(state.parts, key);
  },
  [types.DELETE_ALL_PARTS](state) {
    state.parts = {};
  },
  [types.UPDATE_PART_COUNTER](state, value) {
    state.partCounter = value;
  },
  [types.SET_RESULT](state, result) {
    state.result = result;
  },
  [types.DELETE_AREA_VALUES](state) {
    state.areaValues = {};
  },
};

const actions = {
  areaLoadAreas({ commit }) {
    return axios.get(URL + "packaging/area/areas").then((response) => {
      commit(types.SET_SELECTABLE_AREAS, response.data);
    });
  },
  areaLoadAreaInputFields({ commit }) {
    return axios.get(URL + "packaging/area/areaInputs").then((response) => {
      commit(types.SET_AREA_INPUT_FIELDS, response.data);
    });
  },
  areaLoadPartInputFields({ commit }) {
    return axios.get(URL + "packaging/area/partInputs").then((response) => {
      commit(types.SET_PART_INPUT_FIELDS, response.data);
    });
  },
  areaSetAreaValue({ commit }, { key, value }) {
    commit(types.SET_AREA_VALUE, { key, value });
  },
  areaAddPart({ commit, state }, value) {
    let counter = state.partCounter;
    let obj = { key: counter, ...value };
    if (value.quantity === undefined || value.quantity.value === "") {
      obj.quantity = { value: "max", unit: "" };
    }
    commit(types.ADD_PART, { key: counter, value: obj });
    counter++;
    commit(types.UPDATE_PART_COUNTER, counter);
  },
  areaDeletePart({ commit }, key) {
    commit(types.DELETE_PART, key);
  },
  areaDeleteAllParts({ commit }) {
    commit(types.DELETE_ALL_PARTS);
  },
  areaSendRequest({ commit, state }) {
    let obj = {};
    obj.area = state.areaValues;
    obj.parts = state.parts;
    return axios
      .post(URL + "packaging/area/calculateArea", obj)
      .then((response) => {
        commit(types.SET_RESULT, response.data);
        return true;
      })
      .catch(() => {
        alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
      });
  },
  areaDeleteAreaValues({ commit }) {
    commit(types.DELETE_AREA_VALUES);
  },
};

const getters = {
  areaGetSelectableAreas: (state) => {
    return state.selectableAreas;
  },
  areaGetAreaInputFields: (state) => {
    return state.areaInputFields;
  },
  areaGetPartInputFields: (state) => {
    return state.partInputFields;
  },
  areaGetAreaValues: (state) => {
    return state.areaValues;
  },
  areaGetParts: (state) => {
    return state.parts;
  },
  areaGetResults: (state) => {
    return state.result;
  },
  testAreaValues: (state) => {
    return state.areaValues;
  },
};

const areaModule = {
  state,
  mutations,
  actions,
  getters,
};

export default areaModule;
