<template>
  <view class="detail">
    <view class="title">
      <text class="back" @tap="back">&lt;返回</text>
          <text class="title-text">中草药名录</text>
          <view class="title-bottom-img"></view>
    </view>
    <view class="card-container">
      <view class="card-tag">
        <text>{{ childCategory }}</text>
      </view>
      <view class="card">
        <view class="child-card">
          <view class="pinyin">
            <text>{{ pinyin }}</text>
          </view>
          <view class="hanzi">
            <text>{{ name }}</text>
          </view>
          <view class="img-container">
            <image v-for="image in images" v-bind:key="image.id" :src="image.url" alt="" v-show="image.id == imageId">
            </image>
          </view>
        </view>
        <view class="category">
          <view class="category-pinyin"><text>{{ parentCategoryPinyin }}</text></view>
          <view class="category-hanzi"><text>{{ parentCategory }}</text></view>
        </view>
        <view class="img-step">
          <view v-for="image in images" v-bind:key="image.id" class="step-item" :class="{ select: image.id == imageId }"
            :style="{ width: 60 / images.length + '%' }"></view>
        </view>
      </view>
    </view>
    <view class="content-container">
      <view class="tag-list">
        <text class="nature">{{ nature }}</text>
        <text class="taste">{{ taste }}</text>
      </view>
      <view class="desc" v-show="desc">
        <text>{{ desc }}</text>
      </view>
      <view class="guijing">
        <view class="guijing-tag"></view>
        <text>归经：{{ guijing || "无" }}</text>
      </view>
      <view class="content-item" v-for="content in contents" v-bind:key="content.id">
        <view class="content-title">
          <view class="content-title-tag"><text>{{ content.title }}</text></view>
          <text>{{
              (content.title.length !== maxTitleLen
                ? "&emsp;".repeat(maxTitleLen - content.title.length)
                : "") + content.title
          }}</text>
        </view>
        <textarea auto-height="true" disabled="true" maxlength="-1" class="content" v-model="content.content"></textarea>
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
import { Current } from "@tarojs/taro";
import { pinyin } from "pinyin-pro";
import Taro from "@tarojs/taro";

export default {
  async created() {
    try {
      const { id } = Current.router.params;
      const { data } = await Taro.request({
        url: `https://api.zhongcaoyaominglu.com/api/chinese-medicine/${id}`,
      });
      const {
        data: { name, images, category, meridianTropism, passage, nature, taste },
      } = data;
      this.images = images;
      this.imageId = images[0].id;
      this.guijing = meridianTropism.map((v) => v.name).join("，") + "经";
      this.name = name;
      this.nature = '性' + nature.map(v => v.name).join('，')
      this.taste = '味' + taste.map(v => v.name).join('，')
      this.pinyin = pinyin(this.name, { toneType: "none" });
      this.parentCategory = category.parent.name;
      this.parentCategoryPinyin = pinyin(this.parentCategory, {
        toneType: "none",
      });
      this.childCategory = category.name;
      const desc = passage.filter(v => v.title == '描述')
      this.desc = desc.length > 0 ? desc[0].content : ''
      this.contents = passage.filter(v => v.title !== '描述');
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
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      index: 0,
      maxTitleLen: 5,
      imageId: null,
      images: [],
      desc: "",
      guijing: null,
      contents: [],
      name: "",
      pinyin: "",
      parentCategory: "",
      parentCategoryPinyin: "",
      childCategory: "",
      nature: '',
      taste: ''
    };
  },
  methods: {
    back() {
      Taro.navigateBack({url: '../index/index'})
      // Taro.navigateBack()
    }
  },
};
</script>
