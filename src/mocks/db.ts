import { factory, primaryKey } from '@mswjs/data'

import { nanoid } from '@reduxjs/toolkit'
import { rest } from 'msw'
import {Post } from '../features/type'

const db = factory({
  post: {
    id: primaryKey(String),
    name: String,
  },
})
  ;[
    'Typescript',
    'C#',
    'Laravel',
    'ASP.net',
    'Express',
    'PHP',
    'Javascript',
    'Reactjs',
    'Angular',
    'Vuejs',
  ].forEach((name) => {
  db.post.create({ id: nanoid(), name })
})

export const handlers = [
  rest.post('/posts', async (req, res, ctx) => {
    const { name } = req.body as Partial<Post>

    if (Math.random() < 0.3) {
      return res(
        ctx.json({ error: 'Oh no, there was an error, try again.' }),
        ctx.status(500),
        ctx.delay(300)
      )
    }

    const post = db.post.create({
      id: nanoid(),
      name,
    })

    return res(ctx.json(post), ctx.delay(300))
  }),
  rest.put('/posts/:id', (req, res, ctx) => {
    const { name } = req.body as Partial<Post>
  //  if (Math.random() < 0.3) {
  //    return res(
  //      ctx.json({ error: 'Oh no, there was an error, try again.' }),
  //      ctx.status(500),
  //      ctx.delay(300)
  //    )
  //  }
  // console.log('body post',req.body)
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const post = db.post.update({
      where: { id:{equals:id} },
      data: { name:name },
    })
    // console.log('here post',post)
    return res(ctx.json(post), ctx.delay(300))
  }),
  ...db.post.toHandlers('rest'),
] as const
