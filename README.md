# vue-y-swiper

vue.js 轮播组件

## Props

* `active` —— 当前活跃索引，默认为 0
* `autoplay` —— 是否自动播放，默认为 true
* `content` —— 轮播图片数组：['http://example/1.jpg', 'http://example/2.jpg', ... ,'http://example/n.jpg']
* `duration` —— 轮播延迟时间（秒），默认为 3
* `mode` —— 图片展示样式，默认 aspectFit。
  * aspectFit: 默认值，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
  * scaleToFill: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
  * 可传入 css 类名，自定义图片展示样式
* `direction` —— 滑动方向，默认为 row
  * row: 横向滑动，对应 transition 为 ['slide_left', 'slide_right']
  * row-reverse: 横向滑动，与 row 相反，对应 transition 为 ['slide_right', 'slide_left']
  * column: 纵向滑动，对应 transition 为 ['slide_up', 'slide_down']
  * column-reverse: 纵向滑动，与 column 相反，对应 transition 为 ['slide_down', 'slide_up']
* `transition` —— 过渡效果
  * 接收字符串或字符串数组，默认为空字符串
  * 不传或传入空字符串或空数组时，使用默认过渡效果
  * 传入字符串或长度为 1 的数组时，过渡效果统一作用于正反向操作
  * 传入长度为 2 的数组时，过渡效果分别作用于正、反向操作
  * 传入长度大于 2 的数组时，过渡效果随机作用于正反向操作

## Events

* `onSwiperChange(index)` —— 轮播项改变时触发
* `onSwiperClick(index)` —— 轮播项被点击时触发

## Example

```vue
<template>
  <!-- 图片轮播 -->
  <YSwiper :content="images" direction="column">
  </YSwiper>

  <!-- 自定义配置轮播 -->
  <YSwiper class="swiper_text" :content="texts" :duration="5" @onSwiperChange="swiperChange">
    <slot>
      <span>{{ texts[textIndex] }}</span>
    </slot>
  </YSwiper>
</template>

<script>
import YSwiper from 'vue-y-swiper'

export default {
  components: {
    YSwiper
  },
  data () {
    textIndex: 0,
    texts: ['test', 'hello world', 'hi'],
    images: [
      'https://uploadfile.bizhizu.cn/2014/0114/20140114021923498.jpg',
      'https://uploadfile.bizhizu.cn/2014/0114/20140114021957723.jpg',
      'https://uploadfile.bizhizu.cn/2014/0114/20140114022032385.jpg'
    ]
  },
  methods: {
    swiperChange (index) {
      this.textIndex = index
    }
  }
}
</script>
```
