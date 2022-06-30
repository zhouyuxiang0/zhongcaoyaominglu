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
            <image v-for="image in images" v-bind:key="image.id" :src="image.url" alt="" v-show="image.id == imageId">
            </image>
          </view>
        </view>
        <view class="category">
          <view class="category-pinyin"><text>qu feng shi</text></view>
          <view class="category-hanzi"><text>祛风湿</text></view>
        </view>
        <view class="img-step">
          <view v-for="image in images" v-bind:key="image.id" class="step-item" :class="{ select: image.id == imageId }"
            :style="{ width: 60 / images.length + '%' }"></view>
        </view>
      </view>
    </view>
    <view class="content-container">
      <view class="tag-list">
        <text class="nature">性温</text>
        <text class="taste">味酸</text>
      </view>
      <view class="desc">
        <text>{{ desc }}</text>
      </view>
      <view class="guijing">
        <view class="guijing-tag"></view>
        <text>归经：{{ guijing || "无" }}</text>
      </view>
      <view class="content-item" v-for="content in contents" v-bind:key="content.id">
        <view class="content-title">
          <view class="content-title-tag"><text>{{ content.title }}</text></view>
          <text>{{ content.title.length !== maxTitleLen ? '&emsp;'.repeat((maxTitleLen - content.title.length)) :
              ''
          }}{{ content.title }}</text>
        </view>
        <view class="content">{{ content.content }}</view>
      </view>
    </view>
    <view class="footer">
      <view class="help">?</view>
      <text>本软件仅供学术交流，若求医问药请咨询当地中医，切不可盲目用药。野外采药有风险，生命安全需当心。</text>
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
      },
    ];
    this.contents = [
      { id: 1, title: "入药部位", content: "植物的干燥近成熟果实" },
      {
        id: 2,
        title: "功能",
        content: "平肝和胃，祛湿舒筋。治吐泻转筋，湿痹，脚气，水肿，痢疾。",
      },
    ];
    this.maxTitleLen = [...this.contents].sort((a, b) => a.title.length - b.title.length)[this.contents.length - 1].title.length
    this.index = 0;
    this.imageId = this.images[0].id;
    this.name = "木瓜";
    this.category = "祛风湿散寒";
    this.guijing = "肝，脾经";
    this.desc =
      "又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠又称贴梗海棠";
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
      desc: this.desc,
      guijing: this.guijing,
      contents: this.contents,
    };
  },
  method() { },
};
</script>
