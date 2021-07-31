<template>
  <div class='icons-container'>
    <div class='blog-article'>
      <a target="_blank" href="https://www.zerotower.cn/articles/48">How to Use</a>
    </div>
    <!--  显示所有的icons-->
    <el-tabs type='border-card'>
      <!--      svg-icons-->
      <el-tab-pane label="Icons">
        <div class='grid'>
          <div v-for='icon of svgIcons' :key="icon">
            <el-tooltip placement='top'>
              <div slot='content'>
                {{ generateIconCode(icon) }}
              </div>
              <div class='icon-item'>
                <svg-icon :icon-class='icon' class-name='disabled'></svg-icon>
                <span class='icon-title'>{{ icon }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <!--      elements icons-->
      <el-tab-pane label='Element-UI Icons'>
        <div class='grid'>
          <div v-for="icon of elementIcons" :key="icon">
            <el-tooltip placement='top'>
              <div slot='content'>
                {{ generateElementUiIconCode(icon) }}
              </div>
              <div class='icon-item'>
                <i :class="`el-icon-${icon}`"></i>
                <span class='icon-title'>{{ icon }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import elementIcons from "./element-icons";
import svgIcons from "./svg-icons";

export default {
  name: "Icons",
  data: () => {
    return {
      elementIcons,
      svgIcons,
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}"/>`;
    },
    generateElementUiIconCode(symbol) {
      return `<i class="el-icon-${symbol}"/>`
    }
  }
}
</script>

<style lang='scss' scoped>
.icons-container{
  margin: 10px 20px 0;
  overflow: hidden;
  //栅栏布局
  .grid{
    position: relative;
    display:grid;
    /*https://www.w3school.com.cn/cssref/pr_grid-template-columns.asp*/
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  //每一个icon样式
  .icon-item{
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    &:hover{
      color:deepskyblue;
    }
    //icon 标题
    span{
      display: block;  //单独起一行
      font-size: 16px;  //字太大小一点吧
      margin-top: 10px; //文字和图标保持一点距离
    }
  }

  .blog-article{
    width: 100%;
    height: 30px;
    a{
      color:deepskyblue;
      &:hover{
        text-decoration:underline;
      }
    }
  }

}
</style>