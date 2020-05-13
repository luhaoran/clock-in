<template>
  <div id="home">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "home",
      activeKey:0
    };
  },
  mounted(){
      console.log('123')
  }
};
</script>

<style scoped>
</style>