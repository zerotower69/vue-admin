<script>
export default {
  name: "MenuItem",
  functional:true,  //函数式的组件，没有生命周期钩子
  props:{
    //icon的名字
    icon:{
      type:String,
      default:''
    },
    //标题的名字
    title:{
      type:String,
      default:''
    }
  },
  //渲染虚拟节点
  render(h,context){  //render渲染函数
    //1.获取props的值
    const {icon,title} =context.props;
    const vnodes=[];
    if(icon){
      if(icon.includes("el-icon")){
        vnodes.push(<i class={[icon,'sub-el-icon']}></i>)
      }
      else{
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }
    if(title){
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes;
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>