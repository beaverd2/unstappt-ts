import { BeerData } from 'shared/types/requests'
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchBeers } from 'shared/api'

type ErrorMessage = {
  error: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BeerData[] | ErrorMessage>) {
  const { username, startDate, endDate } = req.query

  if (!username) {
    res.status(500).json({ error: 'no username' })
    return
  }

  if (!startDate || !endDate) {
    res.status(500).json({ error: 'no date range' })
    return
  }

  try {
    const beers = await fetchBeers({
      username: username as string,
      startDate: startDate as string,
      endDate: endDate as string,
    })
    res.status(200).json(beers)
  } catch (error: any) {
    const errorMessage = error?.message ?? 'Something went wrong'
    res.status(500).json({ error: errorMessage })
  }
}
