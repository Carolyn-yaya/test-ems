<template>
  <a-menu-item v-if="onlyOneChild" :key="route.path">
    <router-link :to="resolvePath(route.path)">
      <span>{{ route.meta && route.meta.title }}</span>
    </router-link>
  </a-menu-item>
  <a-sub-menu v-else :key="route.path" v-bind="$attrs">
    <template #title>
      <span>{{ route.meta && route.meta.title }}</span>
    </template>
    <template v-for="item in route.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <router-link :to="resolvePath(item.path)">
            <span>{{ item.meta && item.meta.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :route="item" :key="item.path" :base-path="resolvePath(item.path)" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import path from 'path'
export default {
  name: 'SubMenu',
  props: {
    route: {
      type: Object,
      default: () => ({})
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    onlyOneChild () {
      return this.route.children.length === 1
    }
  },
  methods: {
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style>
</style>
