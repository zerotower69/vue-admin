<template>
  <div :class="classObj" class="app-wrapper">
    <!--    控制移动端的弹窗  点击关闭-->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- 导航菜单被吸附在头部 -->
      <div :class="{ 'fixed-header': fixedHeader }">
        <!--        导航菜单-->
        <navbar />
      </div>
      <!--        主要页面-->
      <app-main />
    </div>
  </div>
</template>

<script>
//布局组件
import { mapState } from "vuex";
import { Navbar, Sidebar, AppMain } from "./components";
export default {
  name: "Layout",
  components: {
    Navbar,
    AppMain,
    Sidebar,
  },
  computed: {
    ...mapState({
      fixedHeader: (state) => state.settings.fixedHeader,
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
    }),
    //绑定多个样式
    classObj() {
      return {
        //关闭
        hideSidebar: !this.sidebar.opened,
        //打开侧边栏
        showSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  mounted() {},
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
/*  应用的wrapper层*/
.app-wrapper {
  // 清除浮点，使得最外层的div能被撑开
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
/* 移动端下的弹出层的期望的一些背景样式调整*/
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
/**  设置吸顶头部的样式 */
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  /**  这里的宽度是计算的,并且有一个短暂的动画 */
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
/**  隐藏侧边栏后导航栏的宽度 */
.hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
/**  移动端下导航栏的宽度 */
  .mobile .fixed-header {
    width: 100%;
  }
</style>