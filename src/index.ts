import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { notFound } from '~/middleware/notFound'
import { onError } from '~/middleware/onError'
import { OK } from '~/utils/httpCodes'
import { version, name } from '../package.json'

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

export const app = new OpenAPIHono()

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

app.notFound(notFound)
app.onError(onError)

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version,
    title: name
  }
})
app.get('/swagger', swaggerUI({ url: '/doc' }))

const port = 3000

serve({
  fetch: app.fetch,
  port
})

console.log(`Server is running on port http://localhost:${port}`)
