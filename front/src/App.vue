<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/products">All Products</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/cart">Cart</router-link>
      <DropDown></DropDown>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
// import AllProducts from './components/AllProducts.vue';
import DropDown from './components/DropDown.vue';

export default {
  components: { DropDown },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: lightgrey;
};

#nav {
  padding: 30px;
  text-align: left;

  a {
    font-weight: bold;
    color: lightblue;

    &.router-link-exact-active {
      color: blue;
    }
  }
}
</style>
