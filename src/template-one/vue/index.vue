<template>
  <div class="template-one">
    <div class="header">{{text}}</div>
    <div class="content">template-one</div>
  </div>
</template>

<script>
export default {
  name: "templateOne",
  data() {
    return {
      text: process.env.NODE_ENV + "1233"
    };
  }
};
</script>

<style lang="less" scoped>
.template-one {
  color: green;
  .content {
    transform: scale(0.8);
    font-size: 40px;
  }
}
</style>



