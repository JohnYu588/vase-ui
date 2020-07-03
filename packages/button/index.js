import VsButton from "./src/button.vue";
// 为组件提供 install 安装方法，供按需引入
VsButton.install = function(Vue) {
  Vue.component(VsButton.name, VsButton);
};
export default VsButton;
