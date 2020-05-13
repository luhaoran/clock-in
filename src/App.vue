<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div id="foot">
      <div class="ft-nav">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuqian" />
        </svg>
        <span>打卡</span>
      </div>
      <div class="ft-nav">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tongjitu" />
        </svg>
        <span>统计</span>
      </div>
      <div class="ft-nav">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yonghu" />
        </svg>
        <span>人员</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  max-width: 750px;
  margin: 0 auto;
}

#foot {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #eee;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px 0;
  background-color: #fff;
  .ft-nav {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon{
      font-size: 26px;
    }
    span{
      font-size: 12px;
    }
  }
}
</style>
