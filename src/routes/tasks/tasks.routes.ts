import { createRoute } from '@hono/zod-openapi'
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
          schema: {}
        }
      },
      description: 'Retrieve the tasks'
    }
  }
})

export type TasksRoute = typeof tasksRoute
