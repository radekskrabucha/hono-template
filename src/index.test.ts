import { describe, it, expect } from 'vitest'
import { app } from './index'

describe('Hono app', () => {
  it('should return "Hello Hono!" for the root route', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Hello Hono!')
  })
})
