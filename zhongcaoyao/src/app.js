import Vue from 'vue'
import './app.css'
import Taro from '@tarojs/taro'

const App = {
  onShow(options) {
    Taro.loadFontFace({
      family: 'fzkt',
      global: true,
      source: 'url("https://raw.githubusercontent.com/zhouyuxiang0/zhongcaoyaominglu/master/api/public/FZKTJW.ttf")',
      success: console.log,
    })
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
