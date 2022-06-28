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
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import "./detail.css";
import { getCurrentInstance } from "@tarojs/taro";
export default {
  name: "木瓜",
  category: "祛风湿散寒",
  created() {
    const current = getCurrentInstance();
    const params = current.router.params;
    this.msg = params.name;
  },
  data() {
    return {
      msg: this.name,
      category: this.category,
    };
  },
  method() {},
};
</script>

