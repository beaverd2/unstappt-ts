import { BeerData } from 'shared/types/requests'
import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type ErrorMessage = {
  error: string
}

export default async function fetchUser(req: NextApiRequest, res: NextApiResponse<BeerData[] | ErrorMessage>) {
  const {
    query: { username, start_date, end_date, offset = 0 },
  } = req
  if (!username) {
    res.status(200).json({ error: 'type username' })
  }
  try {
    const response = await axios.get(`https://api.untappd.com/v4/user/beers/` + username, {
      params: {
        limit: 50,
        start_date,
        end_date,
        offset,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    })
    const beers: BeerData[] = response.data.response
    res.status(200).json(beers)
  } catch (error) {
    const err = error as AxiosError
    res.status(200).json({ error: err.response?.data.meta.error_detail })
  }
}
