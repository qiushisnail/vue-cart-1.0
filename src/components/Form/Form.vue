<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>

export default {
  componentName: 'ZForm',
  
  provide() {
    // 将表单实例传递给后代
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  created() {
    this.fields = [];
    this.$on("k.form.formItemAdd", item => this.fields.push(item));
  },
  methods: {
    async validate(callback) { // 在formtest中调用
      // 将FormItem数组转换为Valitdate返回的promise数组
      const tasks = this.fields.map(item => item.validate());
      // 获取所有结果同意处理
      const results = await Promise.all(tasks);
      let ret = true;
      results.forEach(valid => {
        if (!valid) {
          // 只要一个失败就失败
          ret = false;
        }
      });
      callback(ret);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>