import type { AppRouteHandler } from '~/types/app'
import { OK } from '~/utils/httpCodes'
import type { TasksRoute } from './tasks.routes'
import { getTasks } from './tasks.services'

export const tasksHandler: AppRouteHandler<TasksRoute> = async c => {
  const tasks = await getTasks()

  return c.json(
    tasks,
    OK
  )
}
