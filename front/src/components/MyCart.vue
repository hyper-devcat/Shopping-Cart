<template>
    <div>
      <p v-if="isCartEmpty">
        <i>Please add some products to cart.</i>
      </p>
      <table class="table" v-else>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Images</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                    <th scope="col" width="150px"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in productSelected" :key="index" v-show="product.qty">
                    <th scope="row">{{ product.reference }}</th>
                    <td>
                      <img :src="product.images[0].xsmall" width="70" alt="">
                    </td>
                    <td>{{ product.name }}</td>
                    <td width="300">
                      <button
                      @click="minusOne(product)"
                      :disabled="product.qty==0">
                        -
                      </button>
                      {{ product.qty }}
                      <button
                      @click="addOne(product)"
                      :disabled="product.qty===product.stock">
                        +
                      </button>
                    </td>
                    <td>{{ product.price.base.formatted }}</td>
                    <td>
                      <b-button
                      pill
                      variant="outline-dark"
                      @click="cancelItem(product)">
                      DELETE
                    </b-button>
                    </td>
                    <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total price</td>
                  <td>{{ totalPrice }} €</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="none">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b-form-radio-group
                    v-model="value"
                    :options="options"
                    :state="state">
                      <b-form-invalid-feedback :state="state">
                        Please choose.
                      </b-form-invalid-feedback>
                      <b-form-valid-feedback :state="state">
                        Thank you!
                      </b-form-valid-feedback>
                    </b-form-radio-group>
                  </td>
                </tr>
                <tr class="none">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b-button
                    pill
                    variant="success"
                    @click="checkCart"
                    :disabled="getMode(value)">
                      Checkout
                    </b-button>
                  </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      value: 0,
      options: [
        { text: ' UPS', value: 'first' },
        { text: ' DHL', value: 'second' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      productSelected: 'getCart',
    }),
    isCartEmpty() {
      return this.productSelected.length === 0;
    },
    totalPrice() {
      // console.log(this.productSelected);
      const total = this.productSelected.reduce(
        (totalPrice, index) => totalPrice + index.price.base.amount * index.qty, 0,
      );
      return total;
    },
    state() {
      // console.log(this.value);
      // MOde de livraison
      return Boolean(this.value);
    },
    getMode() {
      return (value) => {
        console.log(value);
        if (value === 'first' || value === 'second') {
          return false;
        }
        return true;
      };
    },
  },
  methods: mapActions(['addOne', 'minusOne', 'cancelItem', 'checkCart']),
};
</script>

<style>
p {
  color:dodgerblue;
  font-size: 15px;
}
</style>
