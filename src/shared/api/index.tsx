import { format, subDays } from 'date-fns'

export const fetchUser = async (username: string) => {
  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
  })
  const url = `https://api.untappd.com/v4/user/info/${username}?${queryParams}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return data.response.user
  } catch (error) {
    console.log(error)
  }
}

const today = new Date()
const weekAgo = subDays(today, 7)

export type FetchBeers = {
  username: string
  startDate?: string
  endDate?: string
  offset?: number
}

export const fetchBeers = async ({ username, startDate, endDate, offset = 0 }: FetchBeers) => {
  const params = new URLSearchParams({
    limit: '50',
    start_date: startDate && endDate ? startDate : format(weekAgo, 'yyyy-MM-dd'),
    end_date: startDate && endDate ? endDate : format(today, 'yyyy-MM-dd'),
    offset: String(offset),
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
  })

  const url = `https://api.untappd.com/v4/user/beers/${username}?`

  try {
    const response = await fetch(url + params)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    const beers = data.response.beers.items

    if (data.response.total_count > 50) {
      const totalPages = Math.floor(data.response.total_count / 50)
      const urls = Array.from({ length: totalPages }, (_, index) => {
        params.set('offset', String((index + 1) * 50))
        return url + params
      })

      const allResponses = await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
      const allBeers = allResponses.map((response) => response.response.beers.items).flat()
      beers.push(...allBeers)
    }
    return beers
  } catch (error) {
    console.log(error)
  }
}
