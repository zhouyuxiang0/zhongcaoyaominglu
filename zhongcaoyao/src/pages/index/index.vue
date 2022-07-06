<template>
  <view class="index">
    <view class="title-container">
      <view class="title">
        <view>
          <text>中草药名录</text>
        </view>
        <view class="calendar">
          <text>{{ today }}</text>
        </view>
        <view
          class="cover"
          @tap="coverTouch"
          :animation="coverAnimation"
        >
          <text class="cover-title">今日药材小知识</text>
        </view>
        <view class="page" @tap="pageTouch" @longpress="jumpDetail" :animation="pageAnimation">
          <view class="nest-page">
            <view class="pinyin-title">
              <text>{{ recommend ? recommend.pinyin : "" }}</text>
            </view>
            <view class="hanzi-title">
              <text>{{ recommend ? recommend.name : "" }}</text>
            </view>
            <image :src="recommend ? recommend.images[0].url : ''" alt="" class="img"> </image>
          </view>
          <image
            src="https://brand-guide.shuyun.com/IAM/44e57334bb0f.png"
            class="eye"
          ></image>
        </view>
      </view>
    </view>
    <view class="list">
      <view
        v-for="(item, index) in category"
        v-bind:key="item.id"
        :class="['item' + index]"
        @tap="selectParentCategory"
        :id="item.id"
        :style="{
          gridColumnStart: listStylesWithRow[index].grid[0],
          gridColumnEnd: listStylesWithRow[index].grid[1],
        }"
      >
        <view
          class="item-container"
          :class="{ touched: item.id == touchedIndex }"
          :style="{ marginBottom: listStylesWithRow[index].marginBottom }"
        >
          <view
            class="item-container-pinyin"
            :class="{ touched: item.id == touchedIndex }"
            :style="{
              marginTop: listStylesWithRow[index].pinyinMarginTop,
              fontSize: listStylesWithRow[index].pinyinFontSize,
            }"
          >
            {{ item.pinyin }}
          </view>
          <view
            class="item-container-text"
            :style="{
              marginBottom: listStylesWithRow[index].textMarginBottom,
              marginTop: listStylesWithRow[index].textMarginTop,
              fontSize: listStylesWithRow[index].textFontSize,
            }"
          >
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <view class="list-bottom">
      <view class="child-category" v-show="touchedIndex">
        <text
          v-for="item in childCategory"
          v-bind:key="item.id"
          :id="item.id"
          @tap="selectChildCategory"
          :class="{ childTouched: item.id == childTouchedIndex }"
          >{{ item.name }}</text
        >
      </view>
      <view class="name-list" v-show="childTouchedIndex">
        <text
          v-for="item in list"
          v-bind:key="item.id"
          :class="{ selected: item.id == selectedIndex }"
          class="name"
          @tap="jumpDetail"
          :id="item.id"
          >{{ item.name }}</text
        >
      </view>
    </view>
    <view class="bottom-img">
      <view class="text-margin"></view>
      <input type="text" class="search" :placeholder="placeholder" />
    </view>
    <view class="foot">
      <text>意见反馈邮箱: zhouyuxiang0@foxmail.com</text>
      <text>参考文献:《本草纲目》</text>
      <text>商务洽谈 WeChat: Tsuripink | 攻城狮: ZHOU | 视觉: 板井泉水</text>
      <view class="sup">
        <navigator
          target="miniProgram"
          open-type="navigate"
          app-id="wx08593a48d086987c"
          path="plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=70199546"
          version="release"
          >赞助小程序</navigator
        >
      </view>
    </view>
  </view>
</template>

<script>
import "./index.css";
import Taro from "@tarojs/taro";
import solarLunar from "solarlunar";
import { pinyin, customPinyin } from "pinyin-pro";
customPinyin({ 咳: "ke" });
export default {
  async created() {
    try {
      this.category = (
        await Taro.request({
          url: "https://api.zhongcaoyaominglu.com/api/category/all-parent",
        })
      ).data.data.map((v) => ({
        ...v,
        pinyin: pinyin(v.name, { toneType: "none" }),
      }));
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const { gzYear, gzMonth, gzDay } = solarLunar.solar2lunar(year, month, day);
    const initAnimation = Taro.createAnimation({});
    initAnimation.rotate3d(0, 1, 0, 90);
    initAnimation.step();
    return {
      listStylesWithRow: [
        {
          grid: [4, 40],
          textFontSize: "50rpx",
          textMarginBottom: "18rpx",
          pinyinFontSize: "30rpx",
          pinyinMarginTop: "18rpx",
          marginBottom: "33rpx",
        },
        {
          grid: [43, 77],
          textFontSize: "50rpx",
          textMarginBottom: "18rpx",
          pinyinFontSize: "30rpx",
          pinyinMarginTop: "18rpx",
          marginBottom: "33rpx",
        },
        {
          grid: [4, 24],
          textFontSize: "30rpx",
          textMarginBottom: "17rpx",
          pinyinFontSize: "25rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [26, 48],
          textFontSize: "30rpx",
          textMarginBottom: "17rpx",
          pinyinFontSize: "25rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [50, 77],
          textFontSize: "30rpx",
          textMarginBottom: "17rpx",
          pinyinFontSize: "21rpx",
          pinyinMarginTop: "15rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [4, 32],
          textFontSize: "30rpx",
          textMarginBottom: "17rpx",
          pinyinFontSize: "25rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [34, 54],
          textFontSize: "30rpx",
          textMarginBottom: "17rpx",
          pinyinFontSize: "25rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [56, 77],
          textFontSize: "30rpx",
          textMarginBottom: "17rpx",
          pinyinFontSize: "21rpx",
          pinyinMarginTop: "15rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [4, 24],
          textFontSize: "28rpx",
          textMarginBottom: "13rpx",
          pinyinFontSize: "22rpx",
          pinyinMarginTop: "13rpx",
          marginBottom: "21rpx",
        },
        {
          grid: [26, 40],
          textFontSize: "28rpx",
          textMarginBottom: "13rpx",
          pinyinFontSize: "22rpx",
          pinyinMarginTop: "13rpx",
          marginBottom: "21rpx",
        },
        {
          grid: [42, 56],
          textFontSize: "28rpx",
          textMarginBottom: "13rpx",
          pinyinFontSize: "22rpx",
          pinyinMarginTop: "13rpx",
          marginBottom: "21rpx",
        },
        {
          grid: [58, 77],
          textFontSize: "28rpx",
          textMarginBottom: "13rpx",
          pinyinFontSize: "22rpx",
          pinyinMarginTop: "13rpx",
          marginBottom: "21rpx",
        },
        {
          grid: [4, 32],
          textFontSize: "28rpx",
          textMarginTop: "3rpx",
          textMarginBottom: "10rpx",
          pinyinFontSize: "19rpx",
          pinyinMarginTop: "13rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [34, 51],
          textFontSize: "28rpx",
          textMarginTop: "3rpx",
          textMarginBottom: "10rpx",
          pinyinFontSize: "19rpx",
          pinyinMarginTop: "13rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [53, 77],
          textFontSize: "28rpx",
          textMarginTop: "3rpx",
          textMarginBottom: "10rpx",
          pinyinFontSize: "19rpx",
          pinyinMarginTop: "13rpx",
          marginBottom: "25rpx",
        },
        {
          grid: [4, 21],
          textFontSize: "30rpx",
          textMarginTop: "2rpx",
          textMarginBottom: "10rpx",
          pinyinFontSize: "20rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "0rpx",
        },
        {
          grid: [23, 39],
          textFontSize: "30rpx",
          textMarginTop: "2rpx",
          textMarginBottom: "10rpx",
          pinyinFontSize: "20rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "0rpx",
        },
        {
          grid: [41, 54],
          textFontSize: "30rpx",
          textMarginTop: "2rpx",
          textMarginBottom: "10rpx",
          pinyinFontSize: "20rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "0rpx",
        },
        {
          grid: [56, 77],
          textFontSize: "30rpx",
          textMarginTop: "2rpx",
          textMarginBottom: "10rpx",
          pinyinFontSize: "20rpx",
          pinyinMarginTop: "10rpx",
          marginBottom: "0rpx",
        },
      ],
      selectedIndex: "",
      touchedIndex: "",
      childTouchedIndex: "",
      placeholder: "苍耳子丶|性平丶|味辛丶|......",
      today: `${gzYear}年 ${gzMonth}月 ${gzDay}日`,
      list: [],
      childCategory: [],
      category: [],
      coverAnimation: "",
      pageAnimation: initAnimation.export(),
      recommend: null,
    };
  },
  methods: {
    jumpDetail(e) {
      this.selectedIndex = e.currentTarget.id;
      Taro.navigateTo({
        url: `../detail/detail?id=${this.selectIndex}`,
      });
    },
    async selectParentCategory(e) {
      this.touchedIndex = e.currentTarget.id;
      const { data } = await Taro.request({
        url: "https://api.zhongcaoyaominglu.com/api/category/children",
        data: {
          parentId: this.touchedIndex,
        },
      });
      this.childCategory = data.data;
    },
    async selectChildCategory(e) {
      this.childTouchedIndex = e.currentTarget.id;
      const { data } = await Taro.request({
        url: "https://api.zhongcaoyaominglu.com/api/chinese-medicine",
        data: {
          page: 1,
          size: 99999,
          categoryId: this.childTouchedIndex,
        },
      });
      this.list = data.data.list;
    },
    async coverTouch(e) {
      if (!this.recommend) {
        const { data } = await Taro.request({
          url: "https://api.zhongcaoyaominglu.com/api/chinese-medicine/recommend",
        });
        this.recommend = {
          ...data,
          pinyin: pinyin(data.name, { toneType: "none" }),
        };
      }
      const coverAnimation = Taro.createAnimation({
        duration: 350,
      });
      coverAnimation.rotate3d(0, 1, 0, 90);
      coverAnimation.step();
      this.coverAnimation = coverAnimation.export();
      const pageAnimation = Taro.createAnimation({
        duration: 350,
        delay: 350,
      });
      pageAnimation.rotate3d(0, 1, 0, 0);
      pageAnimation.step();
      this.pageAnimation = pageAnimation.export();
    },
    async pageTouch(e) {
      const coverAnimation = Taro.createAnimation({
        duration: 350,
        delay: 350,
      });
      coverAnimation.rotate3d(0, 1, 0, 0);
      coverAnimation.step();
      this.coverAnimation = coverAnimation.export();
      const pageAnimation = Taro.createAnimation({
        duration: 350,
      });
      pageAnimation.rotate3d(0, 1, 0, 90);
      pageAnimation.step();
      this.pageAnimation = pageAnimation.export();
    },
  },
};
</script>
