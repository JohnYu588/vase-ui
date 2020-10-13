# vase-ui

## Introduction

This is an UI framework based on Vue. The inspiration comes from Vase 移动端

## demo

:point_right: [https://JohnYu588.github.io/vase-ui/](https://JohnYu588.github.io/vase-ui/)</br>

## Usage

1. Install package [vase-ui]
   ```sh
   npm i -D vase-ui
   ```
2. Get Started

```js
// 全局注册
import VaseUI from 'vase-ui';
Vue.use(VaseUI, { router });
import 'vase-ui/lib/vase-ui.css';
// 按需注册
import { Button, KeepAlive } from 'vase-ui';
Vue.use(Button).use(KeepAlive, { router });
```

```vue
// 全局注册
<template>
  <div id="app">
    <vs-button type="primary">点击报名</vs-button>
  </div>
</template>

<script>
export default {};
</script>
```

```
vase-ui
├─ .eslintrc.js
├─ .gitignore
├─ .npmignore
├─ babel.config.js
├─ deploy.sh
├─ docs               // vuepress开发目录
│  ├─ .vuepress
│  │  ├─ components  // 在markdown中可以使用的vue组件
│  │  │  ├─ vs-button.vue
│  │  │  └─ vs-home.vue
│  │  ├─ config.js   // vurepess配置修改入口,包括左边sidebar,右上方nav导航菜单,favicon等
│  │  └─ dist         // vuepress打包目录
│  │     ├─ 404.html
│  │     ├─ assets
│  │     │  ├─ css
│  │     │  ├─ img
│  │     │  └─ js
│  │     ├─ index.html
│  │     └─ views          // vuepress视图文件，格式是markdown
│  │        ├─ components
│  │        │  └─ basic
│  │        │     └─ index.html
│  │        └─ guide
│  │           ├─ get-started.html
│  │           └─ install.html
│  ├─ README.md
│  └─ views
│     ├─ components
│     │  └─ basic
│     │     └─ README.md
│     └─ guide
│        ├─ get-started.md
│        └─ install.md
├─ package-lock.json
├─ package.json   // 与npm发布相关，记录版本号，包入口文件地址
├─ packages              // 组件库源码目录
│  ├─ button
│  │  ├─ index.js
│  │  └─ src
│  │     └─ button.vue
│  ├─ fonts
│  │  ├─ font.scss
│  │  └─ src
│  │     ├─ element-icons.ttf
│  │     └─ element-icons.woff
│  ├─ index.js   // 组件库源码组件入口文件,执行npm run build的目标文件
│  └─ keep-alive
│     └─ index.js
├─ public    //公共资源入口，如favicon
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ test
│  ├─ App.vue
│  ├─ main.js
│  └─ TestButton.vue
├─ types
│  ├─ button.d.ts
│  ├─ component.d.ts
│  ├─ index.d.ts
│  └─ vase-ui.d.ts
├─ vue.config.js
└─ yarn.lock

```