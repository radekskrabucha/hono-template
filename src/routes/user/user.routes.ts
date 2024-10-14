import { createRoute, z } from '@hono/zod-openapi'
import { OK } from '~/utils/httpCodes'

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

export const usersRoute = createRoute({
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
})

export type UsersRoute = typeof usersRoute
