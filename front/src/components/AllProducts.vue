<template>
    <div id="table">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Images</th>
            <th scope="col" width="350px">Name</th>
            <th scope="col" width="100px">Price</th>
            <th scope="col">Line</th>
            <th scope="col">Slug</th>
            <th scope="col">Stock</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, key) in getAllProducts" :key="key">
            <th scope="row">{{ product.reference }}</th>
            <td><img :src="product.images[0].xsmall" width="100" alt=""></td>
            <td>{{ product.name }}</td>
            <td>{{ product.price.base.formatted }}</td>
            <td>{{ product.line }}</td>
            <td>{{ product.slug }}</td>
            <td>{{ product.qty }}</td>
            <td width="150px">
              <b-button
              variant="outline-dark"
              @click="addToCart(product)"
              :disabled="getRupture(product)">
                Add To Cart
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <br>
      <!-- <h2>My Cart Temporaire</h2>
      <Cart/> -->
    </div>
  </template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import Cart from './MyCart.vue';

export default {
  // components: { Cart },
  name: 'AllProducts',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getAllProducts', 'getRupture']),
  },
  methods:
  mapActions(['addToCart', 'fetchAllProducts']),
  created() {
    this.fetchAllProducts();
  },
};
</script>

<style>
#table {
  margin: 0 50px 0 50px;
}
</style>
