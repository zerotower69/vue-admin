import Vue from 'vue';
import SvgIcon from "@/components/SvgIcon";

Vue.component('svg-icon',SvgIcon);

const req=require.context('./svg',false,/\.svg$/);  //所有的svg读入

const requireAll=requireContext=>requireContext.keys().map(requireContext);

requireAll(req);

