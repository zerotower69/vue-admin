//对Hamburger组件单元测试
import {shallowMount,mount} from "@vue/test-utils"  //踩地雷，注意两者的不同
import {Hamburger} from "@/components"

/**
 *1.Hamburger期望实现什么?
 * 通过点击Hamburger,click事件，能够收起或者展开侧边栏
 */

describe("Hamburger.vue",()=>{
    it("toggle click",async ()=>{
        const wrapper = shallowMount(Hamburger);
        const mockFn=jest.fn();
        const vm=wrapper.vm;
        vm.$on("toggleClick",mockFn);
        wrapper.find(".hamburger").trigger("click");
        expect(mockFn).toBeCalled();
    })
    //检测属性Props 中 isActive
    it("check isActive props ",async ()=>{
       const wrapper = shallowMount(Hamburger);
       /**  setProps (props: object): Promise<void> | void*/
        await wrapper.setProps({isActive:true});   //经过测试，这里设置Props应该是一个异步操作
        // console.log(wrapper.contains('.is-active'));
        expect(wrapper.find(".is-active").exists()).toBe(true)
        await wrapper.setProps({isActive:false});
        expect(wrapper.find(".is-active").exists()).toBe(false)
    })
})