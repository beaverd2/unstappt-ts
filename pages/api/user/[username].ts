import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../../types/IUser';

type ErrorMessage = {
  error: string;
};

export default async function fetchUser(
  req: NextApiRequest,
  res: NextApiResponse<IUser | ErrorMessage>
) {
  const {
    query: { username },
  } = req;

  try {
    const response = await axios.get(
      `https://api.untappd.com/v4/user/info/${username}?`,
      {
        params: {
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        },
      }
    );
    const user: IUser = response.data.response.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(200).json({ error: 'something went wrong' });
  }
}
