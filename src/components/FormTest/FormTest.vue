<template>
  <div>
    <z-form :model="ruleForm" :rules="rules" ref="loginForm">
      <z-form-item label="用户号名" prop="name">
        <z-input v-model="ruleForm.name"></z-input>
      </z-form-item>
      <z-form-item label="密码" prop="pwd">
        <z-input v-model="ruleForm.pwd" type="password"></z-input>
      </z-form-item>
      <z-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </z-form-item>
    </z-form>
    {{ruleForm}}
  </div>
</template>

<script>
import ZForm from "../Form/Form.vue";
import ZFormItem from "../FormItem/FormItem.vue";
import ZInput from "../Input/Input.vue";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称" },
          { min: 6, max: 10, message: "请输入6~10位用户名" }
        ],
        pwd: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    ZInput,
    ZFormItem,
    ZForm
  },
  methods: {
     submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert("提交登录！");
        } else {
          console.log("校验失败");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>