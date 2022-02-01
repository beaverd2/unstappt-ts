import axios, { AxiosError } from 'axios';
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
  if (!username) {
    res.status(200).json({ error: 'type username' });
  }
  try {
    const url = encodeURI(`https://api.untappd.com/v4/user/info/${username}`);
    const response = await axios.get(url, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    });
    const user: IUser = response.data.response.user;
    res.status(200).json(user);
  } catch (error) {
    const err = error as AxiosError;
    res.status(200).json({ error: err.response?.data.meta.error_detail });
  }
}
