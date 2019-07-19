<template>
  <input :type="type" :value="inputValue" @input="inputHandle" />
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  mixins: [emitter],

  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      inputValue: this.value // 接受父组件传的值
    };
  },
  methods: {
    inputHandle(e) {
      this.inputValue = e.target.value;
      // 通知父组件值更新
      this.$emit("input", this.inputValue);

      // 通知FormItem做校验
      // 自己传自己 this.$parent 就是FormItem
      //this.$parent.$emit("validate", this.inputValue);
      this.dispatch("ZFormItem", "k.form.validate", [this.inputValue]);
    }
  }
};
</script>

<style  scoped>
</style>