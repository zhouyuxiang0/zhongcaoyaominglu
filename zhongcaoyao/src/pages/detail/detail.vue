<template>
  <view>
    <view class="title">
      <text>中草药名录</text>
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

