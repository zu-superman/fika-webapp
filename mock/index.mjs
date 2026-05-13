import { menuData } from './menu.js'

const BASE_PATH = '/api'

// Route handlers: { method, path (without /api prefix), handler(req, res) }
const mockRoutes = [
  {
    method: 'GET',
    path: '/system/menu/getRouters',
    handler: () => ({
      code: 200,
      msg: '操作成功',
      data: menuData,
    }),
  },
]

export function createMockMiddleware(server) {
  server.middlewares.use((req, res, next) => {
    const url = req.url.split('?')[0]
    const method = req.method.toUpperCase()

    // Only intercept requests that start with the /api prefix
    if (!url.startsWith(BASE_PATH)) {
      next()
      return
    }

    // Strip the /api prefix to match against mock route paths
    const routePath = url.slice(BASE_PATH.length)

    const match = mockRoutes.find(r => r.method === method && r.path === routePath)
    if (!match) {
      next()
      return
    }

    console.log(`[mock] ${method} ${BASE_PATH}${match.path} → 200`)
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(match.handler(req, res)))
  })
}
