const modules = import.meta.glob('@/views/**/*.vue')

export function convertBackendMenusToRoutes(menuList, layoutComponent) {
  const routes = []

  for (const menu of menuList) {
    const routePath = menu.path.startsWith('/') ? menu.path : `/${menu.path}`

    const route = {
      path: routePath,
      name: menu.name,
      meta: {
        title: menu.title,
        icon: menu.icon || 'Document',
        hidden: menu.hidden || false,
      },
    }

    if (menu.component) {
      route.component = loadView(menu.component)
    } else if (menu.children && menu.children.length > 0) {
      route.component = layoutComponent
      const firstChild = menu.children[0]
      route.redirect = `${routePath}/${firstChild.path}`.replace(/\/+/g, '/')
    }

    if (menu.children && menu.children.length > 0) {
      route.children = convertBackendMenusToRoutes(menu.children, layoutComponent)
    }

    routes.push(route)
  }

  return routes
}

function loadView(componentPath) {
  const fullPath = `/src/views/${componentPath}.vue`
  if (modules[fullPath]) {
    return modules[fullPath]
  }
  return () => import('@/views/error/404.vue')
}
