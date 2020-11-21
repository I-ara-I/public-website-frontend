import * as types from "./mutation-types";
import axios from "./../../../plugins/axios";

const URL = process.env.VUE_APP_API_SPECIFICATION_URL;

const state = {
  inputs: [],
  selectionOptions: {
    material: [],
    shapes: [],
  },
  results: [],
  emptyResults: [],
};

const mutations = {
  [types.SET_MATERIALS](state, payload) {
    state.selectionOptions.material = payload;
  },
  [types.SET_SHAPES](state, payload) {
    state.selectionOptions.shapes = payload;
  },
  [types.SET_INPUTS](state, payload) {
    state.inputs = payload;
  },
  [types.SET_RESULTS](state, payload) {
    state.results = payload;
  },
  [types.SET_EMPTY_RESULTS](state, payload) {
    state.emptyResults = payload;
  },
};

const actions = {
  loadSpecificationMaterials({ commit }) {
    return axios.get(URL + "packaging/specification/materials").then((response) => {
      commit(types.SET_MATERIALS, response.data);
    });
  },
  loadSpecificationShapes({ commit }) {
    return axios.get(URL + "packaging/specification/shapes").then((response) => {
      commit(types.SET_SHAPES, response.data);
    });
  },
  loadSpecificationInputs({ commit }) {
    return axios.get(URL + "packaging/specification/inputs").then((response) => {
      commit(types.SET_INPUTS, response.data);
      return true;
    });
  },
  calculateSpecificationResults({ commit }, payload) {
    return axios.post(URL + "packaging/specification/results", payload).then((response) => {
      commit(types.SET_RESULTS, response.data);
      return true;
    });
  },
  loadEmptySpecificationResults({ commit }) {
    return axios.get(URL + "packaging/specification/results").then((response) => {
      commit(types.SET_EMPTY_RESULTS, response.data);
    });
  },
  deleteSpecificationInputs({ commit }) {
    commit(types.DELETE_INPUTS);
  },
  setSpecificationEmptyResults({ commit }) {
    commit(types.SET_RESULTS, this.getters.specificationEmptyResults);
  },
};

const getters = {
  specificationShapeInputs: (state) => {
    return state.inputs.shape;
  },
  specificationMaterialInputs: (state) => {
    return state.inputs.material;
  },
  specificationPriceInput: (state) => {
    return state.inputs.price;
  },
  specificationInputs: (state) => {
    return state.inputs;
  },
  specificationMaterials: (state) => {
    return state.selectionOptions.material;
  },
  specificationShapes: (state) => {
    return state.selectionOptions.shapes;
  },
  specificationResults: (state) => {
    return state.results;
  },
  specificationEmptyResults: (state) => {
    return state.emptyResults;
  },
};

const specificationModule = {
  state,
  mutations,
  actions,
  getters,
};

export default specificationModule;
