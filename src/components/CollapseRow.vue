<template>
  <a-row
    ref="row"
    class="c-row"
    v-bind="$attrs"
    :style="{ 'max-height': getCollapseHeight + 'px' }"
  >
    <slot />
    <slot v-if="show" name="collapse" />
    <slot name="suffix" />
  </a-row>
</template>
<script>
export default {
  name: 'CollapseRow',
  data () {
    return {
      timer: null,
      show: !this.collapse,
      height: 1000
    }
  },
  props: {
    collapse: {
      type: Boolean,
      default: true
    },
    collapseHeight: {
      type: [Number, String],
      default: 40
    }
  },
  computed: {
    getCollapseHeight () {
      return this.collapse ? parseInt(this.collapseHeight) : parseInt(this.height)
    }
  },
  watch: {
    collapse (val) {
      if (val) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.show = false
        }, 300)
      } else {
        this.show = !val
        this.$nextTick(() => {
          this.height = this.$refs.row.$el.scrollHeight
        })
      }
    }
  },
  mounted () {
    if (this.show) {
      this.height = this.$refs.row.$el.scrollHeight
    }
  }
}
</script>
<style lang="less">
.c-row {
  width: 100%;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  will-change: height;
  .collapse-btn .anticon {
    transition: 0.3s;
    transform-origin:50% 40%;
  }
  .up-ward {
    .anticon {
      transform: rotate(180deg) !important;
    }
  }
  .ant-col {
    margin-bottom: 5px !important;
  }
}
</style>
