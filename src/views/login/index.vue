<template>
  <!--  登录组件-->
  <div class="login-container">
    <!--    登录表单-->
    <el-form
      class="login-form"
      autocomplete="off"
      :model="loginObj"
      @submit.prevent.native
      label-position="left"
    >
      <!--      标题-->
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <!--      账号-->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginObj.username"
          name="username"
          tabindex="1"
          autocomplete="off"
          placeholder="username"
          @focus.prevent="focusParent"
          @blur.prevent="blurParent"
        ></el-input>
      </el-form-item>
      <!--      密码-->
      <!--      大写锁定提醒-->
      <el-tooltip
        v-model="capsToolTip"
        placement="right"
        content="大写锁定已经打开"
        manual
      >
        <el-form-item prop="password">
          <!--        password svg -->
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!--        期望按下键盘也能登录-->
          <!--        检查大写锁定-->
          <el-input
            ref="password"
            :type="passwordType"
            v-model="loginObj.password"
            placeholder="password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @focus.prevent="focusParent"
            @blur.prevent="blurParent"
            @keyup.native="capsLockCheck"
            @keyup.enter.native="handleLogin"
          />
          <!--        三元表达式判断密码是否因该隐藏或者显示后加载不同的svg-icon-->
          <span class="show-pwd" @click="togglePwdType">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon>
          </span>
        </el-form-item>
      </el-tooltip>
      <!--      提交按钮-->
      <el-button
        type="primary"
        size="default"
        style="width: 100%;margin-bottom:30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
      <!--      提示-->
      <div class="tip"></div>
    </el-form>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Login",
  data() {
    return {
      loginObj: {
        username: "",
        password: "",
      },
      passwordType: "password",
      capsToolTip: false,
    };
  },
  //渲染后的钩子
  mounted() {
    //自动设置账号密码输入框的焦点
    if (this.loginObj.username === "") {
      this.$refs.username.focus();
    } else if (this.loginObj.password === "") {
      this.$refs.password.focus();
    }
  },
  watch: {
    $route: {
      handler: function () {},
    },
  },
  methods: {
    //切换密码的显示与隐藏的状态
    togglePwdType() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    //检测大写锁定
    capsLockCheck(e) {
      const { key } = e;
      this.capsToolTip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    //登录
    handleLogin() {
      console.log("login");
    },
    //input获得焦点
    focusParent(e) {
      let item = $(e.path[2]);
      item.addClass("item-focus");
      //  console.log(item)
    },
    // input失去焦点
    blurParent(e) {
      let item = $(e.path[2]);
      item.removeClass("item-focus");
      //  console.log(item)
    },
  },
};
</script>
<style lang='scss'>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
//form-item的样式
.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
// input样式调整
.el-input {
  display: inline-block;
  height: 47px;
  //!关键的部分
  width: 85%; //和icon在同一行
  //默认背景色是白色，不匹配的
  //边框颜色也应该拿掉
  input {
    background: transparent; //改为透明色
    border: 0px; //直接去掉边框
    -webkit-appearance: none; //去除浏览器的默认样式
    border-radius: 0px; //移除圆角样式
    padding: 12px 5px 12px 15px;
    color: $light_gray; //输入的文字颜色
    height: 47px;
    caret-color: $cursor; //改变了光标的颜色
    //控制input autocomplete on的时候的一些样式
     &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
  }
  //虽然这样，但是我仍然想使得我的input获得焦点时
  //让el-form-item的边框变色
}
.item-focus {
  border: 1px solid black !important;
  border-radius: 4px;
}
</style>


<style lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
// 合理放置icon
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
}
// 登录表单居中
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;
  /*
:first-of-type 选择器匹配元素其父级是特定类型的第一个子元素。

提示: 和 :nth-of-type(1) 是一个意思
*/
  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
}
// 正确显示svg
.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
//标题
.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
//密码icon
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>