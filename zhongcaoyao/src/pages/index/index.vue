<template>
  <view class="index">
    <view class="title-container">
      <view class="title">
        <text>中草药名录</text>
      </view>
    </view>
    <text>{{ msg }}</text>
  </view>
</template>

<script>
import './index.css'

export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
