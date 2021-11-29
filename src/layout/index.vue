<template>
  <div class="layout">
    <div class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys">
        <template v-for="route in routes" :key="route.path">
          <sub-menu :route="route" :base-path="route.path" />
        </template>
      </a-menu>
    </div>
    <div class="container">
      <BreadCrumb />
      <transition name="fade-transform" mode="out-in">
        <router-view v-if="$route.path === '/dashboard'" id="body" />
        <a-card class="layout-card" v-else>
          <router-view id="body" />
        </a-card>
      </transition>
    </div>
  </div>
</template>

<script>
import BreadCrumb from './components/BreadCrumb'
import SubMenu from './components/SubMenu'

import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Layout',

  setup () {
    const { getters } = useStore()
    return {
      routes: computed(() => getters.routes),
      selectedKeys: ref([])
    }
  },
  components: { BreadCrumb, SubMenu }
})
</script>

<style lang="less">
.layout {
  height: 100vh;
  overflow: hidden;
  .header {
    height: 64px;
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    background: #007538;
    color: #ffffff;
    padding: 0 50px;
    .logo {
      width: 120px;
      height: 31px;
      margin: 16px 24px 16px 0;
      background: rgba(255, 255, 255, 0.3);
      float: left;
    }
    .ant-menu {
      line-height: 64px;
      font-size: 16px;
    }
  }
  .container {
    height: calc(100vh - 64px);
    margin-top: 64px;
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    .layout-card {
      flex: 1;
      overflow: hidden;
      .ant-card-body {
        height: 100%;
      }
    }
    #body {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
