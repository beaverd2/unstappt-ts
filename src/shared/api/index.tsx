import { format, subDays } from 'date-fns'
import { formatBeerData, mapUserDataToUser } from 'shared/lib/utils'

export const fetchUser = async (username: string) => {
  const queryParams = new URLSearchParams({
    client_id: process.env.CLIENT_ID ?? '',
    client_secret: process.env.CLIENT_SECRET ?? '',
  })
  const url = `https://api.untappd.com/v4/user/info/${username}?${queryParams}`

  const response = await fetch(url)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.meta.error_detail)
  }
  return mapUserDataToUser(result.response.user)
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
    client_id: process.env.CLIENT_ID ?? '',
    client_secret: process.env.CLIENT_SECRET ?? '',
  })

  const url = `https://api.untappd.com/v4/user/beers/${username}?`

  try {
    const response = await fetch(url + params)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.meta.error_detail)
    }

    const beers = result.response.beers.items

    if (result.response.total_count > 50) {
      const totalPages = Math.floor(result.response.total_count / 50)
      const urls = Array.from({ length: totalPages }, (_, index) => {
        params.set('offset', String((index + 1) * 50))
        return url + params
      })

      const allResponses = await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
      const allBeers = allResponses.map((response) => response.response.beers.items).flat()
      beers.push(...allBeers)
    }
    return formatBeerData(beers)
  } catch (error) {
    throw error
  }
}
