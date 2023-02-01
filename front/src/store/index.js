/* eslint-disable no-alert */
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },
  getters: {
    getAllProducts(state) {
      return state.products;
    },
    getCart(state) {
      console.log(state.cart);
      return state.cart;
    },
    getRupture(state) {
      return (product) => {
        const index = state.cart.findIndex((p) => p.reference === product.reference);
        if (index !== -1 && product.qty === state.cart[index].qty) {
          return true;
        }
        return false;
      };
    },
  },
  actions: {
    async fetchAllProducts({ commit }) {
      const config = {
        headers: {
          Accept: 'application/json',
        },
      };
      const res = await axios.get('http://localhost:3000/products', config);
      // console.log('[actions]fetchAllProducts', res);
      // console.log(res.data['188239']);
      commit('setProducts', res);
    },
    addToCart({ commit }, product) {
      commit('addProductToCart', product);
    },
    addOne({ commit }, product) {
      commit('addOneProduct', product);
    },
    minusOne({ commit }, product) {
      commit('minusOneProduct', product);
    },
    cancelItem({ commit }, product) {
      commit('cancelProduct', product);
    },
    checkCart({ commit }, product) {
      commit('checkMyCart', product);
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload.data;
    },
    addProductToCart(state, {
      reference, name, images, price, qty,
    }) {
      const index = state.cart.findIndex((p) => p.reference === reference);
      if (index === -1) {
        state.cart.push({
          reference,
          name,
          images,
          price,
          stock: qty,
          qty: 1,
        });
        // state.products[reference].qty -= 1;
      } else {
        state.cart[index].qty += 1;
        // state.products[reference].qty -= 1;
      }
      // console.log(state.products[reference].stock -= 1);
      // console.log(state.products[reference].qty);
      // state.products[reference].qty -= 1;
    },
    addOneProduct(state, product) {
      const index = state.cart.findIndex((p) => p.reference === product.reference);
      if (index === -1) {
        state.cart[index].qty += 1;
        // state.products[product.reference].qty -= 1;
      }
      console.log(state.cart[index].qty += 1);
      // console.log(state.products[product.reference].qty -= 1);
    },
    minusOneProduct(state, product) {
      const index = state.cart.findIndex((p) => p.reference === product.reference);
      state.cart[index].qty -= 1;
      // state.products[product.reference].qty += 1;
      if (state.cart[index].qty === 0) {
        state.cart.splice(index, 1);
      }
    },
    cancelProduct(state, product) {
      const index = state.cart.findIndex((p) => p.reference === product.reference);
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure?')) {
        state.cart.splice(index, 1);
      } else {
        alert('You keep your items!');
      }
    },
    checkMyCart(state, product) {
      // const index = state.cart.findIndex((p) => p.reference === product.reference);
      state.cart.findIndex((p) => p.reference === product.reference);
      // console.log(state.products[index]);
      state.cart.splice(0);
      alert('Thanks for your shopping!');
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
  },
  modules: {
  },
});
