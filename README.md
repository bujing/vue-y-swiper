# vue-y-swiper

Vue.js 轮播组件

## Install

```
npm install --save-dev vue-y-swiper
```

## Demo

[https://bujing.github.io/demo/vue-y-swiper/](https://bujing.github.io/demo/vue-y-swiper/)

## Props

* `active` —— 当前活跃索引，默认为 0
* `autoplay` —— 是否自动播放，默认为 true
* `content` —— 轮播图片数组：['http://example/1.jpg', 'http://example/2.jpg', ... ,'http://example/n.jpg']
* `duration` —— 轮播延迟时间（秒），默认为 3
* `mode` —— 图片展示样式，默认 aspectFit。
  * aspectFit: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
  * scaleToFill: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
  * 可传入 css 类名，自定义图片展示样式
* `direction` —— 轮播方向，默认为 row
  * row: 左滑为正向，右滑为反向
  * row-reverse: 右滑为正向，左滑为反向
  * column: 上滑为正向，下滑为反向
  * column-reverse: 下滑为正向，上滑为反向
* `transition` —— 过渡效果，默认为 ''
  * 接收字符串或字符串数组
  * 不传或传入空字符串或空数组时，使用默认过渡效果
  * 传入字符串或长度为 1 的数组时，过渡效果统一作用于正、反向操作
  * 传入长度为 2 的数组时，过渡效果分别作用于正、反向操作
  * 传入长度大于 2 的数组时，过渡效果随机作用于正、反向操作

组件内部使用 vue 官方提供的 transition 组件实现过渡效果，所以如需自定义过渡效果，需自行实现过渡 CSS，并通过 `transition` 属性传入类名。

本组件内部实现了 4 种过渡效果，分别对应 4 种轮播方向。

* row: 相当于 `transition` 属性为 ['slide_left', 'slide_right']
* row-reverse: 相当于 `transition` 属性为 ['slide_right', 'slide_left']
* column: 相当于 `transition` 属性为 ['slide_up', 'slide_down']
* column-reverse: 相当于 `transition` 属性为 ['slide_down', 'slide_up']

## Events

* `onSwiperChange(index)` —— 轮播项改变时触发
* `onSwiperClick(index)` —— 轮播项被点击时触发

## Usage

v2.0 版本除横向过渡效果外，其他过渡效果仍 **需指定 swiper 组件高度**

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
    texts: [
      'vue-y-swiper',
      'bujing.github.io',
      '码农炸鸡'
    ],
    images: [
      'https://dummyimage.com/360x240/cce5ff/333&text=vue-y-swiper',
      'https://dummyimage.com/360x240/d4edda/333&text=vue-y-swiper',
      'https://dummyimage.com/360x240/f8d7da/333&text=vue-y-swiper',
      'https://dummyimage.com/360x240/fff3cd/333&text=vue-y-swiper',
      'https://dummyimage.com/360x240/d6d8d9/333&text=vue-y-swiper'
    ]
  },
  methods: {
    swiperChange (index) {
      this.textIndex = index
    }
  }
}
</script>

<style scoped>
.swiper {
  height: 200px;
}
</style>
```
