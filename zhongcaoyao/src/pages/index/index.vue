<template>
  <view class="index">
    <view class="title-container">
      <view class="title">
        <view>
          <text>中草药名录</text>
        </view>
        <view class="calendar">
          <text>{{today}}</text>
        </view>
        <view class="cover">
          <text class="cover-title">今日药材小知识</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './index.css'
import solarLunar from 'solarlunar'

export default {
  data () {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const day = now.getDate()
    const {gzYear, gzMonth, gzDay} = solarLunar.solar2lunar(year, month, day)

    return {
      today: `${gzYear}年 ${gzMonth}月 ${gzDay}日`,
    }
  }
}
</script>
