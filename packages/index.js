import Button from "./button";
import KeepAlive from "./keep-alive";

import "./fonts/font.scss";
// 存储组件列表
const components = [Button];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue, options = { key: "", router: {} }) {
  const { key = "cacheTo", router } = options;
  // 遍历注册全局组件
  components.forEach(function(item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
  Vue.use(KeepAlive, { key, router });
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export { Button, KeepAlive };
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  version: "0.2.9",
  install
};
