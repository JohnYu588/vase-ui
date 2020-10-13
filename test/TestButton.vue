<template>
  <div class="app">
    <div class="row">
      <vs-button>按钮</vs-button>
      <vs-button type="primary">按钮</vs-button>
      <vs-button type="success">按钮</vs-button>
      <vs-button type="info">按钮</vs-button>
      <vs-button type="warning">按钮</vs-button>
    </div>
    <div class="row">
      <vs-button plain>按钮</vs-button>
      <vs-button plain type="primary">按钮</vs-button>
      <vs-button plain type="success">按钮</vs-button>
      <vs-button plain type="info">按钮</vs-button>
      <vs-button plain type="warning">按钮</vs-button>
    </div>
    <div class="row">
      <vs-button round plain>按钮</vs-button>
      <vs-button round plain type="primary">按钮</vs-button>
      <vs-button round plain type="success">按钮</vs-button>
      <vs-button round plain type="info">按钮</vs-button>
      <vs-button round plain type="warning">按钮</vs-button>
    </div>
    <div class="row">
      <vs-button circle>OK</vs-button>
      <vs-button circle type="primary">OK</vs-button>
      <vs-button circle type="success">OK</vs-button>
      <vs-button circle type="info">OK</vs-button>
      <vs-button circle type="warning">OK</vs-button>
    </div>
    <div class="row">
      <vs-button plain>字体</vs-button>
      <vs-button icon="vs-icon-check" circle plain type="primary"></vs-button>
      <vs-button icon="vs-icon-message" circle plain type="success"></vs-button>
      <vs-button icon="vs-icon-search" circle plain type="info"></vs-button>
      <vs-button icon="vs-icon-star-off" plain type="warning">字体图标</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jump(e) {
      console.log(e);
      alert(123);
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  width: 600px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.row {
  padding: 10px 0;
}
.vs-button {
  margin-left: 10px;
}
</style>
