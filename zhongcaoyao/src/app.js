import Vue from 'vue'
import './app.css'
import Taro from '@tarojs/taro'


const App = {
  onLaunch() {
    Taro.loadFontFace({
      family: 'kaiti',
      global: true,
      source: `url("https://admin.zhongcaoyaominglu.com/FZKTJW.ttf?1622620995")`,
      desc: {
        style: 'normal',
        weight: 'normal',
        variant: 'normal',
      },
      fail: (res) => {
        console.log(res)
      },
    })
  },
  onShow(options) {

  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
