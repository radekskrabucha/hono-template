import { createRouter } from '~/lib/createApp'
import * as handlers from './tasks.handlers'
import * as routes from './tasks.routes'

export const tasksRouter = createRouter().openapi(
  routes.tasksRoute,
  handlers.tasksHandler
)
