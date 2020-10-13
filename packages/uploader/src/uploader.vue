<template>
  <div class="uploader">
    <div class="uploader__wrapper">
      <div v-for="(item, key) in imgList" :key="key" class="uploader__preview">
        <div class="uploader__preview-image">
          <img class="image__img" :src="getObjectURL(item)" alt="图片" @click="onPreviewImage(item)" />
        </div>
        <div class="uploader__preview-delete">
          <van-icon @click="onDelete(item, index)" class="icon" name="cross"></van-icon>
        </div>
      </div>
      <div class="add-btn">
        <van-icon name="photograph" class="photo" />
        <input class="upButton" ref="input" type="file" accept="image/*" @change="onChange($event)" />
      </div>
    </div>

    <transition name="slim-fade">
      <div v-show="cropShow" class="crop-wrap">
        <ImageCropper ref="cropper" :src="inputImgUrl"></ImageCropper>
        <div class="btn-box">
          <button @click="hideCrop">取消</button>
          <button @click="submitCrop">使用</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import ImageCropper from '../ImageCropper';

const getObjectURL = (file) => {
  let url;
  if (window.createObjectURL) {
    url = window.createObjectURL(file);
  } else if (window.URL) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};
export default {
  name: 'VsUploader',
  data() {
    return {
      imgList: [],
      cropShow: false, // 裁剪弹窗显示
      inputImgUrl: '', // input 选中的图片 url
      getObjectURL,
      loading: false,
    };
  },
  components: {
    ImageCropper,
  },
  methods: {
    deleteFile(file, index) {
      this.imgList.splice(index, 1);
    },

    onDelete(file, index) {
      this.deleteFile(file, index);
    },
    onPreviewImage(item) {
      const imageContents = this.imgList.map((i) => getObjectURL(i));
      ImagePreview({
        images: imageContents,
        closeOnPopstate: true,
        startPosition: this.imgList.indexOf(item),
      });
    },
    onChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.inputImgUrl = getObjectURL(files[0]);
      this.showCrop();
    },
    showCrop() {
      this.cropShow = true;
    },
    hideCrop() {
      this.cropShow = false;
      this.$refs.input.value = ''; // 可上传同一张
    },
    async submitCrop() {
      this.hideCrop();
      const img = await this.$refs.cropper.getCroppedBlob();
      this.imgList.push(img);
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
  background: transparent;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.uploader {
  position: relative;
  display: inline-block;
  .uploader__wrapper {
    display: flex;
    flex-wrap: wrap;
    .uploader__preview {
      position: relative;
      margin: 0 8px 8px 0;
      cursor: pointer;
      .uploader__preview-image {
        display: block;
        width: 80px;
        height: 80px;
        overflow: hidden;
        .image__img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .add-btn {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 80px;
      height: 80px;
      margin: 0 8px 8px 0;
      background-color: #f7f8fa;
    }
    .photo {
      color: #dcdee0;
      font-size: 24px;
    }
    .uploader__preview-delete {
      position: absolute;
      top: 0;
      right: 0;
      width: 14px;
      height: 14px;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 12px;
      .icon {
        position: absolute;
        top: -2px;
        right: -2px;
        color: #fff;
        font-size: 16px;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }
    }

    .upButton {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
      opacity: 0;
    }
    .add-btn {
      > img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .submit-btn {
    margin: 60px auto;
    display: block;
    width: 70%;
    height: 60px;
    background: #409eff;
    border-radius: 60px;
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    &:disabled {
      background: #ededed;
      color: #cccccc;
    }
  }
  .crop-wrap {
    z-index: 1;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #000;
    .btn-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      > button {
        width: 60px;
        height: 100%;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
      }
    }
  }
  .slim-fade-enter-active,
  .slim-fade-leave-active {
    transition: all 0.4s ease;
  }
  .slim-fade-enter,
  .slim-fade-leave-to {
    opacity: 0;
    transform-origin: top;
    transform: translateY(100%);
  }
}
</style>
