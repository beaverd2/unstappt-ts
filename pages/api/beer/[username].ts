import { BeerData } from 'shared/types/requests'
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchBeers } from 'shared/api'

type ErrorMessage = {
  error: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BeerData[] | ErrorMessage>) {
  const {
    query: { username, startDate, endDate },
  } = req
  if (!username) {
    res.status(500).json({ error: 'type username' })
  }
  try {
    const beers = await fetchBeers({ username, startDate, endDate })
    res.status(200).json(beers)
  } catch (error: any) {
    const errorMessage = error?.message ?? 'Something went wrong'
    res.status(500).json({ error: errorMessage })
  }
}
