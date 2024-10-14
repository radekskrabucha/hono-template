import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound } from '~/middleware/notFound'
import { onError } from '~/middleware/onError'
import { pinoLogger } from '~/middleware/pinoLogger'
import { serveEmojiFavicon } from '~/middleware/serveEmojiFavicon'
import type { AppBindings } from '~/types/app'

export const createRouter = () => {
  return new OpenAPIHono<AppBindings>({ strict: false })
}

export const createApp = () => {
  const app = createRouter()

  app.use(pinoLogger())
  app.use(serveEmojiFavicon('⭐️'))

  app.notFound(notFound)
  app.onError(onError)

  return app
}
