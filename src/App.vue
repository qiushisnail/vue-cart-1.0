<template>
  <div id="app">
    <form-test></form-test>
    <ul>
      <li v-for="(good, i) in goods" :key="good.id">
        {{good.name}}￥{{good.price}}
        <button @click="addGood(i)">加购物车</button>
      </li>
    </ul>
    <cart></cart>
  </div>
</template>

<script>
import cart from "./components/cart/cart.vue";
import FormTest from './components/FormTest/FormTest.vue';
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      goods: []
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/goods");
      this.goods = response.data.list;
    } catch (error) {
      console.log(error)
    }
  },
  components: {
    cart,
    FormTest
  },
  methods: {
    addGood(i) {
      const good = this.goods[i];
      this.$bus.$emit("addCart", good);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
