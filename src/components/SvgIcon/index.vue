<template>
  <!--  外部的svg-->
  <div v-if="isExternal" :style="styleExternalIcon" class='is-external-icon svg-icon' v-on="$listeners"></div>
  <!--  todo: learning $listeners-->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import {isExternal} from "@/utils/validate"

export default {
  name: "SvgIcon",
  //参数
  props: {
    //用于计算icon的名字
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    //icon name
    iconName() {
      return "#icon-" + this.iconClass
    },
    //icon band class
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className
      } else {
        return "svg-icon"
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>