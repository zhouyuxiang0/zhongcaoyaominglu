<template>
  <view class="detail">
    <view class="title">
      <text>中草药名录</text>
      <view class="title-bottom-img"></view>
    </view>
    <view class="card-container">
      <view class="card-tag">
        <text>祛风湿散寒</text>
      </view>
      <view class="card">
        <view class="child-card">
          <view class="pinyin">
            <text>mu gua</text>
          </view>
          <view class="hanzi">
            <text>木 瓜</text>
          </view>
          <view class="img-container">
            <image
              v-for="image in images"
              v-bind:key="image.id"
              :src="image.url"
              alt=""
              v-show="image.id == imageId"
            ></image>
          </view>
        </view>
        <view class="category">
          <view class="category-pinyin"><text>qu feng shi</text></view>
          <view class="category-hanzi"><text>祛风湿</text></view>
        </view>
        <view class="img-step">
          <view
            v-for="image in images"
            v-bind:key="image.id"
            class="step-item"
            :class="{ select: image.id == imageId }"
            :style="{width: 60 / images.length + '%' }"
          ></view>
        </view>
      </view>
    </view>
    <view class="content-container">
      <text class="nature">性温</text>
      <text class="taste">味酸</text>
      <view class="content"></view>
    </view>
  </view>
</template>

<script>
import "./detail.css";
import { getCurrentInstance } from "@tarojs/taro";
export default {
  created() {
    const current = getCurrentInstance();
    const params = current.router.params;
    this.msg = params.name;
  },
  data() {
    this.images = [
      {
        id: 1,
        url: "https://img1.baidu.com/it/u=2134124050,2944533276&fm=253&fmt=auto&app=138&f=JPEG?w=554&h=500",
      },
      {
        id: 2,
        url: "https://img1.baidu.com/it/u=3493083225,1202270131&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      },
      {
        id: 3,
        url: "https://img1.baidu.com/it/u=2134124050,2944533276&fm=253&fmt=auto&app=138&f=JPEG?w=554&h=500",
      }
    ];
    this.index = 0;
    this.imageId = this.images[0].id;
    this.name = "木瓜";
    this.category = "祛风湿散寒";
    setInterval(() => {
      this.index = this.index + 1;
      const target = this.images[this.index];
      if (target) {
        this.imageId = target.id;
      } else {
        this.index = 0;
        this.imageId = this.images[0].id;
      }
    }, 5000);
    return {
      imageId: this.imageId,
      images: this.images,
      msg: this.name,
      category: this.category,
    };
  },
  method() {},
};
</script>
