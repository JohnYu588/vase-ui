---
title: '快速上手'
---

# 快速上手

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

<ClientOnly>
  <!-- <sakura-img/> -->
</ClientOnly>
