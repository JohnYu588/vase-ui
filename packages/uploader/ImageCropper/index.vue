<template>
  <div class="c">
    <img ref="img" class="__img" :src="src" />
  </div>
</template>

<script type="text/ecmascript-6">
import Cropper from 'cropperjs';
import './cropper.min.css';

// toBlob polyfill
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value(callback, type, quality) {
      const binStr = atob(this.toDataURL(type, quality).split(',')[1]);
      const len = binStr.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      callback(new Blob([arr], { type: type || 'image/png' }));
    },
  });
} // dev


export default {
  name: 'ImageCropper',
  props: {
    src: {
      // 图片链接
      type: String,
      default: undefined,
    },
    aspectRatio: {
      // 宽高比
      type: Number,
      default: 1,
    },
    cropperOptions: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
    };
  },
  watch: {
    async src(val) {
      if (val) {
        if (this.cropper) {
          this.cropper.replace(val);
        } else {
          await this.$nextTick();
          this.init();
        }
      }
    },
  },
  async mounted() {
    this.cropper = null; // cropper 实例
    if (this.src) {
      await this.$nextTick();
      this.init();
    }
  },
  methods: {
    init() {
      const options = {
        viewMode: 1, // 限制裁剪框不超过画布的大小
        dragMode: 'move', // 移动画布
        cropBoxMovable: false, // 通过拖动移动裁剪框
        guides: false, // 裁剪框虚线
        center: false, // 裁剪框中心线
        background: false, // 容器网格背景
        autoCropArea: 1, // 初始化裁剪面积
        toggleDragModeOnDblclick: false, // 裁剪器上单击两次时，可以在“裁剪”和“移动”之间切换拖动模式
        aspectRatio: this.aspectRatio, // 宽高比
        ...this.cropperOptions,
      };
      this.cropper = new Cropper(this.$refs.img, options);
    },
    // 获取裁剪后的图片 blob 对象
    getCroppedBlob(type = 'image/jpeg', quality = 1) {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file);
        }, type, quality);
      });
    },
  },
};
</script>

<style lang="scss">
.c {
  width: 100%;
  height: 100%;
  margin: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    width: 100%;
  }
  .cropper-container {
    .cropper-view-box {
      outline: 1px solid #fff;
      outline-color: rgba(255, 255, 255, 1);
    }
    .cropper-line {
      background-color: #fff;
    }
    .cropper-point {
      background-color: #fff;
      opacity: 1;
    }
    .point-e,
    .point-n,
    .point-w,
    .point-s {
      display: none;
    }
    .point-ne,
    .point-nw,
    .point-sw,
    .point-se {
      width: 10px;
      height: 10px;
      // z-index: -1;
      opacity: 0.8;
    }
  }
}
</style>
