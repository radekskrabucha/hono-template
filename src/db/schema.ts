import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
})

export type InsertTask = typeof tasks.$inferInsert
export type SelectTask = typeof tasks.$inferSelect

export const insertTaskSchema = createInsertSchema(tasks)
export const selectTaskSchema = createSelectSchema(tasks)
