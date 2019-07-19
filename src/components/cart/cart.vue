<template>
  <div>
    <h1>购物车</h1>
    <table border="1">
      <tr>
        <th>#</th>
        <th>课程名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
      <tr v-for="(good,i) in cartGoods" :key="good.id" :class="{active:good.active}">
        <td>
          <input type="checkbox" v-model="good.active" />
        </td>
        <td>{{good.name}}</td>
        <td>{{good.price}}</td>
        <td>
          <button @click="minus(i)">-</button>
          {{good.count}}
          <button @click="add(i)">+</button>
        </td>
        <td>￥{{good.count*good.price}}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{activeCount}}/{{count}}</td>
        <td colspan="2">￥{{total}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartGoods: JSON.parse(localStorage.getItem('cart')) || []
    };
  },
  watch: {
    cartGoods: {
      handler(n, o){
        localStorage.setItem('cart',JSON.stringify(n))
      },
      deep: true
    }
  },
  created() {
    this.$bus.$on("addCart", good => {
      let add = this.cartGoods.find(v => v.id === good.id);

      if (add) {
        add.count++;
      } else {
        this.cartGoods.push({
          ...good,
          count: 1,
          active: true
        });
      }
    });
  },
  computed: {
    activeCount() {
      return this.cartGoods.filter(v => v.active).length;
    },
    count() {
      return this.cartGoods.length;
    },
    total() {
      let num = this.cartGoods.reduce((acc, cur) => {
        if (cur.active) {
          return acc + cur.count * cur.price;
        }else{
          return acc;
        }
      }, 0);
      return num;
    }
  },
  methods: {
    add(i) {
      this.cartGoods[i].count++;
    },
    minus(i) {
      const count = this.cartGoods[i].count;
      if (count === 1) {
        this.remove(i);
      } else {
        this.cartGoods[i].count--;
      }
    },
    remove(i) {
      if (window.confirm("确认要删除吗")) {
        this.cartGoods.splice(i, 1);
      }
    }
  }
};
</script>

<style  scoped>
.active {
  color: green;
}
</style>