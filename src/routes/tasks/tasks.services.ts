import { db } from '~/db'

export const getTasks = () => db.query.tasks.findMany()
