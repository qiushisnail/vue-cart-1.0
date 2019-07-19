<template>
  <div>
    <label v-if="label">{{label}}</label>
    <div>
      <slot></slot>
      <p v-if="validatStatus == 'error'" class="error">{{errorMsg}}</p>
    </div>
  </div>
</template>

<script>
import schema from "async-validator"; // 校验
export default {
  inject: ["form"], //注入form，获得model和rules
  props: ["label", "prop"],
  data() {
    return {
      validatStatus: "",
      errorMsg: ""
    };
  },
  created() {
    this.$on("validate", this.validate);
  },
  mounted() {
    //挂载到form上时，派发一个添加事件
    if (this.prop) {
      this.$parent.$emit("formItemAdd", this);
    }
  },
  methods: {
    validate(value) {
      console.log(value)
      return new Promise(resolve => {
         // 校验规则
        const desc = { [this.prop]: this.form.rules[this.prop] }; // es6计算属性
        const validator = new schema(desc); // 实例
        validator.validate({ [this.prop]: this.form.model[this.prop] }, errors => {
          if (errors) {
            // errors是数组
            // 校验是失败
            this.validatStatus = "error";
            this.errorMsg = errors[0].message;
            resolve(false)
          } else {
            this.validatStatus = "";
            this.errorMsg = "";
            resolve(true)
          }
        });
      })
     
    }
  }
};
</script>

<style  scoped>
.error {
  color: red;
}
</style>