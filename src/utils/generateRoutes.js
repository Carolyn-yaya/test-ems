import layout from '@/layout'
export default function generateRoutes(arr) {
  
  const getRoutes = (arr) => {
    arr.forEach(route => {
      if (route.children) {
        route.children = getRoutes(route.children)
      }
      const path = route.component
      route.component = route.component === 'layout' ? layout : () => import(`@/views${path}`)
    })
    return arr
  }
  return getRoutes(arr)
}