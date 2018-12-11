<template>
  <div class="template-two">
    <div class="header">{{text}}</div>
    <div class="content">template-two</div>
  </div>
</template>

<script>
export default {
  name: "templateTwo",
  data() {
    return {
      text: process.env.NODE_ENV + "template-two"
    };
  }
};
</script>

<style lang="less" scoped>
.template-two {
  color: red;
  .content {
    transform: scale(0.8);
    font-size: 40px;
  }
}
</style>



