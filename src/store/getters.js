const getters = {
  token: state => state.user.token,
  id: state => state.user.id,
  name: state => state.user.name,
  routes: state => state.user.routes,
  permission: state => state.user.permission,
  systemName: state => state.user.systemName,
  logo: state => state.user.logo
}
export default getters
