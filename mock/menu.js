// Mock menu data mimicking the backend /system/menu/getRouters response format
// Each menu item: { name, path, hidden, component, children, meta: { title, icon } }

const menuData = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    hidden: false,
    children: [],
    meta: {
      title: '仪表盘',
      icon: 'House',
    },
  },
  {
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: '/system/user',
    children: [
      {
        name: 'User',
        path: '/system/user',
        hidden: false,
        component: 'system/user/index',
        children: [],
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        name: 'Role',
        path: '/system/role',
        hidden: false,
        component: 'system/role/index',
        children: [],
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        name: 'Menu',
        path: '/system/menu',
        hidden: false,
        component: 'system/menu/index',
        children: [],
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
  },
  {
    name: 'Profile',
    path: '/profile',
    hidden: false,
    children: [],
    meta: {
      title: '个人中心',
      icon: 'UserFilled',
    },
  },
]

module.exports = { menuData }
