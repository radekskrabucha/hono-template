import { createRoute, z } from '@hono/zod-openapi'
import { selectTaskSchema } from '~/db/schema'
import { OK } from '~/utils/httpCodes'

const tags = ['Tasks']

export const tasksRoute = createRoute({
  method: 'get',
  path: '/',
  tags,
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: z.array(selectTaskSchema).openapi('Task')
        }
      },
      description: 'Retrieve the tasks'
    }
  }
})

export type TasksRoute = typeof tasksRoute
