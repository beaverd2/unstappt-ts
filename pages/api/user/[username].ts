import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchUser } from 'shared/api'
import { UserData } from 'shared/types/requests'

type ErrorMessage = {
  error: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserData | ErrorMessage>) {
  const { username } = req.query

  if (!username) {
    res.status(500).json({ error: 'Please provide a username' })
    return
  }

  try {
    const user = await fetchUser(username as string)
    res.status(200).json(user)
  } catch (error: any) {
    const errorMessage = error?.message ?? 'Something went wrong'
    res.status(500).json({ error: errorMessage })
  }
}
