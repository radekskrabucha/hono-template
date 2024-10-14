import { config } from 'dotenv'
import { z } from 'zod'

config()

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
})

export type Env = z.infer<typeof EnvSchema>

export let env: Env

try {
  env = EnvSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables')
    console.error(error.flatten().fieldErrors)
    process.exit(1)
  }
}
