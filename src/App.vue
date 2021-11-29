<template>
  <div id="app">
    <a-config-provider :locale="CN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import { ref } from 'vue'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  setup () {
    const CN = ref(zh_CN)
    return {
      CN
    }
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
