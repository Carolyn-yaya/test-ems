const routers = [
  {
    path: '/',
    component: 'layout',
    redirect: '/dashboard',
    meta: {
      title: '总览',
      icon: ''
    },
    children: [
      {
        path: 'dashboard',
        component: '/dashboard/index',
        name: 'Dashboard',
        meta: {
          title: '总览',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/workorder',
    name: 'Workorder',
    component: 'layout',
    redirect: '/workorder/list',
    hidden: false,
    meta: {
      title: '工单管理',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: '/workorder/WorkOrderList',
        name: 'WorkOrderList',
        hidden: false,
        meta: {
          title: '工单列表',
          icon: ''
        }
      },
      {
        path: 'tally-manage',
        component: '/workorder/tally',
        name: 'TallyManage',
        hidden: false,
        meta: {
          title: '点检管理',
          icon: ''
        }
      },
      {
        path: 'maintenance',
        component: '/workorder/maintenance',
        name: 'Maintenance',
        hidden: false,
        meta: {
          title: '维保管理',
          icon: ''
        }
      },
      {
        path: 'pending',
        component: '/workorder/pending/index',
        name: 'Pending',
        hidden: false,
        meta: {
          title: '待办工单',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/assetManage',
    name: 'AssetManage',
    component: 'layout',
    redirect: '/assetManage/device-manage',
    hidden: false,
    meta: {
      title: '资产管理',
      icon: ''
    },
    children: [
      {
        path: 'device-manage',
        component: '/assetManage/DeviceManage',
        name: 'DeviceManage',
        hidden: false,
        meta: {
          title: '设备管理',
          icon: ''
        }
      },
      {
        path: 'store-manage',
        component: '/assetManage/StoreManage',
        name: 'StoreManage',
        hidden: false,
        meta: {
          title: '门店管理',
          icon: ''
        }
      }
    ]
  }
]

export default routers
