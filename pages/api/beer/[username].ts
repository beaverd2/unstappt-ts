import { IBeers } from '../../../types/IBeers';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type ErrorMessage = {
  error: string;
};

export default async function fetchUser(
  req: NextApiRequest,
  res: NextApiResponse<IBeers[] | ErrorMessage>
) {
  const {
    query: { username, start_date, end_date, offset = 0 },
  } = req;
  try {
    const response = await axios.get(
      `https://api.untappd.com/v4/user/beers/` + username,
      {
        params: {
          limit: 50,
          start_date,
          end_date,
          offset,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        },
      }
    );
    const beers: IBeers[] = response.data.response;
    res.status(200).json(beers);
  } catch (error) {
    res.status(200).json({ error: 'something went wrong' });
  }
}
