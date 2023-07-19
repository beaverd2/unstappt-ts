import type { NextApiRequest, NextApiResponse } from 'next'

type ErrorMessage = {
  error: string
}

export default async function fetchUser(req: NextApiRequest, res: NextApiResponse<ErrorMessage>) {
  const { username } = req.query

  if (!username) {
    res.status(200).json({ error: 'type username' })
  }
}
