<template>
  <div class="BreadCrumb">
    <a-breadcrumb :routes="breadcrumb">
      <template #itemRender="{ route, routes, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.meta.title }}
        </span>
        <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BreadCrumb',
  setup () {
    const route = useRoute()

    return {
      breadcrumb: computed(() => route.matched),
      basePath: ''
    }
  }
})
</script>

<style lang="less">

</style>
