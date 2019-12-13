<template>
  <div>
    <h3>理论上，你可以轮播任何东西</h3>
    <YSwiper class="swiper_text" :content="texts" :duration="5" @onSwiperChange="changeActive">
      <span>{{texts[active]}}</span>
    </YSwiper>

    <h3>横向反向轮播</h3>
    <YSwiper :content="images" direction="row-reverse"/>

    <h3>纵向反向轮播</h3>
    <YSwiper class="swiper_img" :content="images" direction="column-reverse"/>

    <h3>自定义轮播特效 <a href="javascript:;" @click="toggleCustomPop">点我</a></h3>
    <YSwiper class="swiper_img" :content="images" transition="y-rotate"/>

    <div class="mask" @click.self="toggleCustomPop" v-if="customPop">
      <div class="custom">
        <select @click="changeCustomKey">
          <option :value="key" v-for="(value, key, index) in customTrans" :key="index" :selected="key === customKey">{{value.name}}</option>
        </select>
        <pre><code>{{customTrans[customKey].code}}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import YSwiper from '../core/index'

export default {
  components: {
    YSwiper
  },
  data () {
    return {
      active: 0,
      texts: [
        'vue-y-swiper',
        'bujing.github.io',
        '码农炸鸡：风味独特，肉鲜味美，外酥里嫩，色泽幽香，老少皆宜，回味无穷'
      ],
      images: [
        'https://dummyimage.com/360x240/cce5ff/333&text=vue-y-swiper',
        'https://dummyimage.com/360x240/d4edda/333&text=vue-y-swiper',
        'https://dummyimage.com/360x240/f8d7da/333&text=vue-y-swiper',
        'https://dummyimage.com/360x240/fff3cd/333&text=vue-y-swiper',
        'https://dummyimage.com/360x240/d6d8d9/333&text=vue-y-swiper'
      ],
      customPop: false,
      customKey: 'y-rotate',
      customTrans: {
        'y-rotate': {
          name: '旋转效果',
          code: `.y-rotate {
  &-enter-active {
    animation: y-rotate 0.5s linear forwards;
    left: 50%;
    position: absolute;
    top: 50%;
  }
}

@keyframes y-rotate {
  0% {
    height: 10%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 10%;
  }

  100% {
    height: 100%;
    transform: translate(-50%, -50%) rotate(360deg);
    width: 100%;
  }
}`
        }
      }
    }
  },
  methods: {
    changeActive (n) {
      this.active = n
    },

    toggleCustomPop () {
      this.customPop = !this.customPop
    },

    changeCustomKey (e) {
      this.customKey = e.target.value
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  &_img {
    height: 240px;
  }

  &_text {
    margin: 0 auto;
    width: 200px;
  }
}

.mask {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}

.custom {
  background-color: #fff;
  border-radius: 5px;
  left: 50%;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
<style lang="scss">
.y-rotate {
  &-enter-active {
    animation: y-rotate 0.5s linear forwards;
    left: 50%;
    position: absolute;
    top: 50%;
  }
}

@keyframes y-rotate {
  0% {
    height: 10%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 10%;
  }

  100% {
    height: 100%;
    transform: translate(-50%, -50%) rotate(360deg);
    width: 100%;
  }
}
</style>