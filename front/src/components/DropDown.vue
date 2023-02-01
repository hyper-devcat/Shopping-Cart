<template>
    <div>
      <b-dropdown text="My Cart" variant="outline-primary" ref="dropdown" class="m-2">
      <Cart/>
        <br>
      <router-link to="/cart">See My Cart</router-link>
    </b-dropdown>
    <router-view/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cart from './MyCart.vue';

export default {
  components: { Cart },
  name: 'DropDown',
  computed: {
    ...mapGetters({
      productSelected: 'getCart',
    }),
  },
};
</script>
