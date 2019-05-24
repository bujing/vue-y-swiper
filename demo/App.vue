<template>
  <div>
    <YSwiper class="swiper_text" :content="texts" :duration="5" @onSwiperChange="changeActive">
      <slot>
        <span>{{texts[active]}}</span>
      </slot>
    </YSwiper>

    <YSwiper :content="images" direction="row-reverse"/>

    <YSwiper :content="images" direction="column-reverse"/>
  </div>
</template>

<script>
import YSwiper from '../src/main'

export default {
  components: {
    YSwiper
  },
  data () {
    return {
      active: 0,
      texts: [1, 2, 3],
      images: [
        'https://uploadfile.bizhizu.cn/2014/0114/20140114021923498.jpg',
        'https://uploadfile.bizhizu.cn/2014/0114/20140114021957723.jpg',
        'https://uploadfile.bizhizu.cn/2014/0114/20140114022032385.jpg',
        'https://uploadfile.bizhizu.cn/2014/0923/20140923031459603.jpg',
        'https://uploadfile.bizhizu.cn/2014/0923/20140923031511705.jpg'
      ]
    }
  },
  methods: {
    changeActive (n) {
      this.active = n
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 240px;

  &_text {
    height: 60px;
  }
}
</style>
