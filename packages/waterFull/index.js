import VsWaterFull from './src/waterFull.vue';
// 为组件提供 install 安装方法，供按需引入
VsWaterFull.install = function(Vue) {
  Vue.component(VsWaterFull.name, VsWaterFull);
};
export default VsWaterFull;
