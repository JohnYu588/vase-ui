# vase-ui

## Introduction

This is an UI framework based on Vue. The inspiration comes from Vase

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
