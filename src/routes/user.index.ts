import { createRouter } from '~/lib/createApp'
import * as handlers from './user.handlers'
import * as routes from './user.routes'

export const userRouter = createRouter().openapi(
  routes.usersRoute,
  handlers.userHandler
)
