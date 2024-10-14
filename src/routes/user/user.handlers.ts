import type { AppRouteHandler } from '~/types/app'
import { OK } from '~/utils/httpCodes'
import type { UsersRoute } from './user.routes'

export const userHandler: AppRouteHandler<UsersRoute> = c => {
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
