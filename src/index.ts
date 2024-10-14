import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { notFound } from '~/middleware/notFound'
import { onError } from '~/middleware/onError'
import { pinoLogger } from '~/middleware/pinoLogger'
import { serveEmojiFavicon } from '~/middleware/serveEmojiFavicon'
import type { AppBindings } from '~/types/app'
import { env } from '~/utils/env'
import { OK } from '~/utils/httpCodes'
import { configureOpenApi } from './lib/openApi'

const ParamsSchema = z.object({
  id: z.coerce
    .number()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path'
      },
      example: 1212121
    })
})

const UserSchema = z
  .object({
    id: z.coerce.number().positive().openapi({
      example: 123
    }),
    name: z.string().openapi({
      example: 'John Doe'
    }),
    age: z.number().openapi({
      example: 42
    })
  })
  .openapi('User')

const route = createRoute({
  method: 'get',
  path: '/users/{id}',
  tags: ['User'],
  request: {
    params: ParamsSchema
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema
        }
      },
      description: 'Retrieve the user'
    }
  }
})

export const app = new OpenAPIHono<AppBindings>({ strict: false })

app.openapi(route, c => {
  const { id } = c.req.valid('param')
  return c.json(
    {
      id,
      age: 20,
      name: 'Ultra-man'
    },
    OK
  )
})

app.use(pinoLogger())
app.use(serveEmojiFavicon('⭐️'))

app.notFound(notFound)
app.onError(onError)

configureOpenApi(app)

serve({
  fetch: app.fetch,
  port: env.PORT
})

console.log(`Server is running on port ${env.PORT}`)
