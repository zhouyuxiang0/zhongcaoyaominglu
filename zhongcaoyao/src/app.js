import Vue from 'vue'
import './app.css'
import Taro from '@tarojs/taro'


const App = {
  onLaunch() {
    Taro.cloud.init({
      env: 'zhongcaoyao'
    })
    Taro.cloud.getTempFileURL({
      fileList: ['cloud://zhongcaoyao-6g02avio86251601.7a68-zhongcaoyao-6g02avio86251601-1309599613/FZKTJW.ttf'],
      success: (res) => {
        const url = res[0].tempFileUrl
        Taro.loadFontFace({
          family: 'kaiti',
          global: true,
          source: `url("${url}")`,
          desc: {
            style: 'normal',
            weight: 'normal',
            variant: 'normal',
          },
          success: (res) => {
            console.log('-------', res);
          },
          fail: (res) => {
            console.log('-----', res)
          }
        })
      }
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
