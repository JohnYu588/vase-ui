import VsUploader from './src/uploader.vue';
// 为组件提供 install 安装方法，供按需引入
VsUploader.install = function(Vue) {
  Vue.component(VsUploader.name, VsUploader);
};
export default VsUploader;
