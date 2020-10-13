<!-- web瀑布流(网络图片) -->
<template>
  <div class="flow-box">
    <!-- 类别列表 -->
    <div class="type-box">
      <ul class="type-list">
        <li
          @click="changeType(index)"
          v-for="(item, index) in typeList"
          :class="['type-item', typeIndex == index ? 'type-item-on' : '']"
          :key="index"
        >
          <div class="text">{{ item.name }}</div>
          <div class="line"></div>
        </li>
      </ul>
    </div>

    <!-- 列表 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100vh;"
      :success-duration="800"
      success-text="加载成功"
      loading-text="加载中..."
    >
      <van-list
        v-if="haveData == 2"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onBottomLoad"
        :offset="150"
        :immediate-check="false"
      >
        <div class="data-list-box" id="data-list-box">
          <div
            class="data-item"
            v-for="(item, index) in dataList"
            @click="openModalDe(item)"
            :style="{ width: boxWidth + 'px' }"
            :key="index"
          >
            <img class="data-thumb" :src="item.thumb" :style="{ width: '100%', height: item.imgHeight + 'px' }" />
            <div class="data-name">{{ item.name }}</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'VsWaterFull',
  data() {
    return {
      list: [], // 数据列表
      page: 1, // 页码
      isRefresh: false, // 下拉刷新
      limit: 10, // 每页加载条数
      finishedText: '',
      typeList: [
        // 分类列表

        { name: '全部' },
        { name: '手机数码' },
        { name: '家用电器' },
        { name: '酒水饮料' },
        { name: '钟表珠宝' },
        { name: '美妆护肤' },
        { name: '运动户外' },
        { name: '汽车生活' },
      ],
      typeIndex: 0, // 分类索引
      dataList: [], // 列表数据
      haveData: 0, // 是否有数据，1=无，2=有，0=页面还未初始化
      isLoading: false, // 下拉刷新进行中，请求开始true, 请求完成false，用于下拉刷新组件van-pull-refresh
      loading: false, // 上拉加载更多中，上拉触底时自动变成true, 请求完成设置为false, 用于列表组件van-list
      finished: false, // 上拉加载是否加载完最后一页数，用于组件van-list
      itemCount: 0, // 上一次加载完成后的瀑布流item个数
      lastRowHeights: [0, 0], // 最后一行标签的顶部间距+高度，2列
      boxMargin: 15, // 每个item之间的边距
      boxWidth: 165, // 每个item宽度
    };
  },
  created() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
    // 当前瀑布流设置为两列，计算瀑布流每个item和图片的宽度
    const screenWidth = document.body.offsetWidth; // 屏幕宽度
    // eslint-disable-next-line no-mixed-operators
    this.boxWidth = (screenWidth - this.boxMargin * 3) / 2; // 每个item的宽度
    this.onRefresh(); // 刷新数据
  },
  methods: {
    changeType(index) {
      // 切换类型
      if (this.typeIndex === index) return;
      Toast.loading({
        message: '加载中...',
        duration: 0,
      });
      this.typeIndex = index;
      this.onRefresh();
    },
    initial() {
      this.page = 1;
      this.finished = false;
      this.loading = true;
      this.dataList = [];
      this.getList();
    },
    onRefresh() {
      this.initial();
    },
    onBottomLoad() {
      // 上拉加载更多
      if (this.finished) {
        return;
      }

      // 说明所有数据已经加载完毕，返回
      this.getList(); // 下一页数据请求中
    },
    // 数据请求
    // 获取活动列表
    async getList() {
      // 避免下拉刷新时重复加载第一页数据
      if (!this.loading) {
        return;
      }
      try {
        setTimeout(() => {
          const data = {
            totalPage: 5,
            list: [
              {
                id: 1,
                thumb: 'https://pic3.zhimg.com/v2-89735fee10045d51693f1f74369aaa46_r.jpg',
                name: '男儿何不带吴钩，收取关山五十州',
              },
              {
                id: 2,
                thumb: 'https://pic1.zhimg.com/v2-ca51a8ce18f507b2502c4d495a217fa0_r.jpg',
                name: '秦时明月汉时关，万里长征人未还',
              },
              {
                id: 3,
                thumb: 'https://pic1.zhimg.com/v2-c90799771ed8469608f326698113e34c_r.jpg',
                name:
                  '这俩人是现今世上，手段最高明的摸金校尉，都有万夫不挡之勇，神鬼莫测之机，兼有云长之忠，翼德之猛，子龙之勇，孔明之智',
              },
              {
                id: 4,
                thumb: 'https://pic1.zhimg.com/v2-8d3dd83f3a419964687a028de653f8d8_r.jpg',
                name: '但使龙城飞将在，不教胡马度阴山',
              },
              {
                id: 5,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/5917432693463665344.jpg',
                name: '胡司令,看在党国的份上,拉兄弟一把~ --- 《鬼吹灯》',
              },
              {
                id: 6,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/5917432693463665344.jpg',
                name:
                  '看来我要去见马克思了，对不住了战友们，我先走一步，给你们到那边占座位去了，你们有没有什么话要对革命导师说的，我一定替你们转达 --- 《鬼吹灯》',
              },
              {
                id: 7,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/5917432693463665344.jpg',
                name: '你看我和老胡，谁能和你把纯洁的革命友谊进一步升华升华？ --- 《鬼吹灯》',
              },
              {
                id: 8,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name: '千磨万击还坚劲，任尔东南西北风',
              },
              {
                id: 9,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name:
                  '看来我要去见马克思了，对不住了战友们，我先走一步，给你们到那边占座位去了，你们有没有什么话要对革命导师说的，我一定替你们转达 --- 《鬼吹灯》',
              },
              {
                id: 10,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name:
                  '老胡同志，你放心去吧，革命事业有你不多，没你不少，你到了老马那边好好学习革命理论啊，听说他们总吃土豆炖牛肉，你吃得习惯吗？ --- 《鬼吹灯》',
              },
              {
                id: 11,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name:
                  '老胡同志，你放心去吧，革命事业有你不多，没你不少，你到了老马那边好好学习革命理论啊，听说他们总吃土豆炖牛肉，你吃得习惯吗？ --- 《鬼吹灯》',
              },
              {
                id: 12,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name:
                  '老胡同志，你放心去吧，革命事业有你不多，没你不少，你到了老马那边好好学习革命理论啊，听说他们总吃土豆炖牛肉，你吃得习惯吗？ --- 《鬼吹灯》',
              },
              {
                id: 13,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name:
                  '老胡同志，你放心去吧，革命事业有你不多，没你不少，你到了老马那边好好学习革命理论啊，听说他们总吃土豆炖牛肉，你吃得习惯吗？ --- 《鬼吹灯》',
              },
              {
                id: 14,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name:
                  '老胡同志，你放心去吧，革命事业有你不多，没你不少，你到了老马那边好好学习革命理论啊，听说他们总吃土豆炖牛肉，你吃得习惯吗？ --- 《鬼吹灯》',
              },
              {
                id: 15,
                thumb: 'https://imgm.gmw.cn/attachement/jpg/site215/20201007/7334281492777553585.jpg',
                name:
                  '老胡同志，你放心去吧，革命事业有你不多，没你不少，你到了老马那边好好学习革命理论啊，听说他们总吃土豆炖牛肉，你吃得习惯吗？ --- 《鬼吹灯》',
              },
            ],
          };
          this.resolveDataList(data, data.list);
        }, 2000);
      } catch (error) {
        this.$toast.clear();
        this.isLoading = false; // 下拉刷新请求完成
        this.loading = false; // 上拉加载更多请求完成
      }
    },
    loadImagesHeight(data, list) {
      let count = 0; // 用来计数，表示是否所有图片高度已经获取
      list.forEach((item, index) => {
        // 创建图片对象，加载图片，计算图片高度
        const img = new Image();
        img.src = item.thumb;
        img.onload = img.onerror = (e) => {
          count++;
          if (e.type === 'load') {
            // 图片加载成功
            // 计算图片缩放后的高度：图片原高度/原宽度 = 缩放后高度/缩放后宽度
            list[index].imgHeight = Math.round((img.height * this.boxWidth) / img.width);
            // console.log('index: ', index, ', load suc, imgHeiht: ', list[index].imgHeight);
          } else {
            // 图片加载失败，给一个默认高度50
            list[index].imgHeight = 50;
            console.log('index： ', index, '， 加载报错：', e);
          }
          // 加载完成最后一个图片高度，开始下一步数据处理
          if (count === list.length) {
            this.resolveDataList(data, list);
          }
        };
      });
    },
    resolveDataList(data, list) {
      // 处理数据
      // 下拉刷新，清空原数据
      if (this.page <= 1) {
        this.itemCount = 0;
        this.dataList = [];
        this.lastRowHeights = [0, 0]; // 存储每列的最后一行高度清0
      }

      // 合并新老两个数组数据
      this.dataList = [...this.dataList, ...list];
      // 判断页面是否有数据
      this.haveData = this.dataList.length > 0 ? 2 : 1;
      console.log('...datalist: ', this.dataList);
      console.log('...this.isLoading: ', this.isLoading);
      this.$nextTick(() => {
        setTimeout(() => {
          // 渲染完成，计算每个item宽高，设置标签坐标定位
          this.setItemElementPosition();
          this.finished = this.page >= +data.totalPage;
          if (this.page > +data.totalPage) {
            return;
          }
          this.page += 1;
          this.isLoading = false; // 下拉刷新请求完成
          this.loading = false; // 上拉加载更多请求完成
        }, 1000);
      });
    },
    // 获取每个item标签高度，设置item的定位
    setItemElementPosition() {
      const parentEle = document.getElementById('data-list-box');
      const boxEles = parentEle.getElementsByClassName('data-item');
      for (let i = this.itemCount; i < boxEles.length; i++) {
        const tempEle = boxEles[i];
        // 上一个标签最小高度的列索引
        const curColIndex = this.getMinHeightIndex(this.lastRowHeights);
        const boxTop = this.lastRowHeights[curColIndex] + this.boxMargin;
        const boxLeft =
          // eslint-disable-next-line no-mixed-operators
          curColIndex * (this.boxWidth + this.boxMargin) + this.boxMargin;
        tempEle.style.left = `${boxLeft}px`;
        tempEle.style.top = `${boxTop}px`;
        this.lastRowHeights[curColIndex] = boxTop + tempEle.offsetHeight;
        // console.log('i = ', i, ', boxTop: ', boxTop, ', eleHeight: ', tempEle.offsetHeight);
      }
      this.itemCount = boxEles.length;
      // 修改父级标签的高度
      const maxHeight = Math.max.apply(null, this.lastRowHeights);
      parentEle.style.height = `${maxHeight}px`;
      this.$toast.clear();
      console.log('...boxEles: ', boxEles.length, ', maxH: ', maxHeight);
    },
    // 获取数组中最小值的索引
    // eslint-disable-next-line consistent-return
    getMinHeightIndex(arr) {
      const minHeight = Math.min.apply(null, arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === minHeight) {
          return i;
        }
      }
    },
  },
};
</script>
<style>
.flow-box {
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
}
.flow-box .type-box {
  width: 100%;
  height: 40px;
  position: fixed;
  top: 0;
  font-size: 14px;
  background: #fff;
  color: rgba(0, 0, 0, 0.4);
  z-index: 99;
  border-bottom: 0.5px solid #dddddd;
  padding: 0 5px;
}
.type-box .type-list {
  white-space: nowrap;
  overflow-x: scroll;
}
.type-list .type-item {
  display: inline-block;
  padding: 0 12.5px;
  height: 40px;
  text-align: center;
}
.type-list .type-item .text {
  line-height: 37.5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin: 0;
}
.type-list .type-item .line {
  background-color: #ffffff;
}
.type-list .type-item-on .text {
  font-size: 16px;
  color: #f0142d;
}
.type-list .type-item-on .line {
  width: 19px;
  height: 2px;
  margin: 0 auto;
  background-color: #f0142d;
  border-radius: 2px;
}
/* 隐藏滚动条 */
.type-list::webkit-scrollbar {
  display: none;
}
/* 列表数据样式 */
@keyframes data-item-ani {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
.flow-box .data-list-box {
  position: relative;
  min-height: 100vh;
  margin-top: 40px;
}
.data-list-box .data-item {
  height: auto;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  background-color: #ffffff;
  left: -1000px;
  animation: data-item-ani 0.4s;
  transition: left 0.6s, top 0.6s;
  transition-delay: 0.1s;
}
.data-item .data-thumb {
  display: block;
}
.data-item .data-name {
  font-size: 14px;
  padding: 5px 10px;
  text-align: left;
}
</style>
