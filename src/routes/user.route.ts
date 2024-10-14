import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '~/lib/createApp'
import { OK } from '~/utils/httpCodes'

export const userRouter = createRouter()

const ParamsSchema = z.object({
  id: z.coerce
    .number()
    .positive()
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

userRouter.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['User'],
    request: {
      params: ParamsSchema
    },
    responses: {
      [OK]: {
        content: {
          'application/json': {
            schema: UserSchema
          }
        },
        description: 'Retrieve the user'
      }
    }
  }),
  c => {
    const { id } = c.req.valid('param')
    return c.json(
      {
        id,
        age: 20,
        name: 'Ultra-man'
      },
      OK
    )
  }
)
