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
        <view class="cover">
          <text class="cover-title">今日药材小知识</text>
        </view>
      </view>
    </view>
    <view class="list">
      <view
        v-for="(item, index) in category"
        v-bind:key="item.id"
        :style="item.style"
        :class="['item' + index]"
      >
        <view
          class="item-container"
          :class="{ touched: item.id == touchedIndex }"
        >
          <view
            class="item-container-pinyin"
            :class="{ touched: item.id == touchedIndex }"
          >
            {{ item.pinyin }}
          </view>
          <view class="item-container-text">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <view class="list-bottom">
      <view class="child-category">
        <text
          v-for="item in childCategory"
          v-bind:key="item.id"
          :class="{ childTouched: item.id == childTouchedIndex }"
          >{{ item.name }}</text
        >
      </view>
      <view class="name-list">
        <text
          v-for="item in list"
          v-bind:key="item.id"
          :class="{ selected: item.id == selectedIndex }"
          class="name"
          @tap="jumpDetail"
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
import { pinyin } from "pinyin-pro";

export default {
  mounted () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const { gzYear, gzMonth, gzDay } = solarLunar.solar2lunar(year, month, day);
    this.today = `${gzYear}年 ${gzMonth}月 ${gzDay}日`
    // this.category =
  },
  data() {

    // console.log(consts.bgImgs);
    const list = [
      {
        id: 1,
        name: "解表",
      },
      {
        id: 2,
        name: "清热",
      },
      {
        id: 3,
        name: "泻下",
      },
      {
        id: 4,
        name: "祛风湿",
      },
      {
        id: 5,
        name: "芳香化湿",
      },
      // {
      //   id: 6,
      //   name: "利水渗湿",
      // },
      {
        id: 7,
        name: "温里",
      },
      {
        id: 8,
        name: "理气",
      },
      {
        id: 9,
        name: "消食导滞",
      },
      {
        id: 10,
        name: "驱虫",
      },
      {
        id: 11,
        name: "止血",
      },
      {
        id: 12,
        name: "活血",
      },
      {
        id: 13,
        name: "化痰止咳平喘",
      },
      {
        id: 14,
        name: "安神",
      },
      {
        id: 15,
        name: "平肝熄风",
      },
      {
        id: 16,
        name: "开窍",
      },
      {
        id: 17,
        name: "补益",
      },
      {
        id: 18,
        name: "固涩",
      },
      {
        id: 19,
        name: "外用",
      },
    ];
    return {
      selectedIndex: "3",
      touchedIndex: "16",
      childTouchedIndex: "1",
      placeholder: "苍耳子丶|性平丶|味辛丶|......",
      today: this.today,
      list: [
        { id: 1, name: "麝香" },
        { id: 2, name: "苏百合" },
        { id: 3, name: "安息香" },
        { id: 4, name: "石菖蒲" },
      ],
      childCategory: [
        { id: 1, name: "温宣开窍" },
        { id: 2, name: "凉宣开窍" },
      ],
      category: list.map((v) => {
        if (!url) throw Error(v.name);
        return {
          ...v,
          pinyin: pinyin(v.name, { toneType: "none" }),
        };
      }),
    };
  },
  methods: {
    jumpDetail(e) {
      Taro.navigateTo({
        url: `../detail/detail?name=${e.currentTarget.id}`,
      });
    },
  },
};
</script>

