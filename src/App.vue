<template>
  <div class="swiper" @touchstart="onStart" @touchmove="onMove" @touchend="onEnd">
    <transition :name="trans">
      <div class="swiper__item" @click="onTouch" :key="cur">
        <slot>
          <img :class="mode" :src="content[cur]" />
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  props: {
    // 当前活跃索引，默认为 0（第一项）
    active: {
      type: Number,
      default: 0
    },
    // 是否自动播放，默认为 true
    autoplay: {
      type: Boolean,
      default: true
    },
    // 轮播内容数组
    content: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 延迟时间（秒），默认为 3秒
    duration: {
      type: Number,
      default: 3
    },
    /**
     * 图片展示模式
     * aspectFit: 默认值，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
     * scaleToFill: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
     */
    mode: {
      type: String,
      default: 'aspectFit'
    },
    /**
     * 默认滑动方向
     * row: 默认值，横向滑动，对应 transition 为 ['slide_left', 'slide_right']
     * row-reverse: 横向滑动，与 row 相反，对应 transition 为 ['slide_right', 'slide_left']
     * column: 纵向滑动，对应 transition 为 ['slide_up', 'slide_down']
     * column-reverse: 纵向滑动，与 column 相反，对应 transition 为 ['slide_down', 'slide_up']
     */
    direction: {
      type: String,
      default: 'row'
    },
    /**
     * 过渡效果
     * 接收字符串或字符串数组，默认为空字符串
     * 不传或传入空字符串或空数组时，使用默认过渡效果
     * 传入字符串或长度为 1 的数组时，过渡效果统一作用于正反向操作
     * 传入长度为 2 的数组时，过渡效果分别作用于正、反向操作
     * 传入长度大于 2 的数组时，过渡效果随机作用于正反向操作
     */
    transition: {
      type: [String, Array],
      default: ''
    }
  },
  data () {
    return {
      cur: this.active,
      dir: this.direction,
      trans: '',
      interval: 0,
      st: 0,
      et: 0
    }
  },
  methods: {
    setActive () {
      let len = this.content.length
      this.cur = this.cur === len - 1 ? 0 : ++this.cur
      this.$emit('onSwiperChange', this.cur)
    },

    setDirection () {
      let map = {
        'row': 'row-reverse',
        'row-reverse': 'row',
        'column': 'column-reverse',
        'column-reverse': 'column'
      }
      this.dir = map[this.dir]
    },

    setTransition () {
      let trans = ''

      let isString = typeof this.transition === 'string'
      let isArray = Array.isArray(this.transition)

      if ((isString && !this.transition) || (isArray && !this.transition.length)) { // 不传或传入空字符串或空数组
        let map = {
          'row': 'slide_left',
          'row-reverse': 'slide_right',
          'column': 'slide_up',
          'column-reverse': 'slide_down'
        }
        trans = map[this.dir]
      } else if ((isString && this.transition) || (isArray && this.transition.length === 1)) { // 传入字符串或长度为 1 的数组
        trans = isString ? this.transition : this.transition[0]
      } else if (isArray && this.transition.length === 2) { // 传入长度为 2 的数组
        trans = this.dir === 'row' || this.dir === 'column' ? this.transition[0] : this.transition[1]
      } else if (isArray && this.transition.length > 2) { // 传入长度大于 2 的数组
        let r = Math.floor(Math.random() * this.transition.length)
        trans = this.transition[r]
      }

      this.trans = trans
    },

    onSlide () {
      window.clearInterval(this.interval)
      this.interval = window.setInterval(() => {
        this.setActive()
      }, this.duration * 1000)
    },

    onTouch () {
      this.$emit('onSwiperClick', this.cur)
    },

    onStart (e) {
      window.clearInterval(this.interval)
      let touches = e.targetTouches
      let touch = touches[touches.length - 1]
      if (this.dir.indexOf('row') === 0) {
        this.st = touch.pageX
      } else {
        this.st = touch.pageY
      }
    },

    onMove (e) {
      // 修正 ios 下左右滑动导致页面上下滚动的体验问题
      e.preventDefault()
      e.stopPropagation()
    },

    onEnd (e) {
      e.stopPropagation()
      let touches = e.changedTouches
      let touch = touches[touches.length - 1]
      if (this.dir.indexOf('row') === 0) {
        this.et = touch.pageX
      } else {
        this.et = touch.pageY
      }

      if (Math.abs(this.et - this.st) > 100) {
        this.setDirection()
        this.setTransition()
        this.setActive()
      }

      this.autoplay && this.onSlide()
    }
  },
  created () {
    this.setTransition()
    this.autoplay && this.onSlide()
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;

  &__item {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
}

img {
  &.aspectFit {
    max-height: 100%;
    max-width: 100%;
  }

  &.scaleToFill {
    height: 100%;
    width: 100%;
  }
}

.slide {
  // 左滑
  &_left {
    &-enter {
      transform: translate(100%, 0);
    }

    &-enter-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-enter-to {
      transform: translate(0, 0);
    }

    &-leave {
      transform: translate(0, 0);
    }

    &-leave-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-leave-to {
      transform: translate(-100%, 0);
    }
  }

  // 右滑
  &_right {
    &-enter {
      transform: translate(-100%, 0);
    }

    &-enter-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-enter-to {
      transform: translate(0, 0);
    }

    &-leave {
      transform: translate(0, 0);
    }

    &-leave-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-leave-to {
      transform: translate(100%, 0);
    }
  }

  // 上滑
  &_up {
    &-enter {
      transform: translate(0, 100%);
    }

    &-enter-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-enter-to {
      transform: translate(0, 0);
    }

    &-leave {
      transform: translate(0, 0);
    }

    &-leave-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-leave-to {
      transform: translate(0, -100%);
    }
  }

  // 下滑
  &_down {
    &-enter {
      transform: translate(0, -100%);
    }

    &-enter-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-enter-to {
      transform: translate(0, 0);
    }

    &-leave {
      transform: translate(0, 0);
    }

    &-leave-active {
      position: absolute;
      transition: all 0.4s;
    }

    &-leave-to {
      transform: translate(0, 100%);
    }
  }
}
</style>
