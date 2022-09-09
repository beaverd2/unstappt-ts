import {useEffect, useState} from 'react'
import {Beer} from 'shared/types/data'

export const useStatisticsData = (beers: Beer[]) => {
  const [statistics, setStatistics] = useState({
    checkinsCount: 0,
    beersCount: 0,
    stylesCount: 0,
    breweriesCount: 0,
    countriesCount: 0,
    avgRating: 0,
  })

  useEffect(() => {
    if (beers.length > 0) {
      setStatistics({
        checkinsCount: beers.length,
        beersCount: beers.filter((beer) => beer.count === 1).length,
        stylesCount: [...new Set(beers.map((beer) => beer.style))].length,
        breweriesCount: [...new Set(beers.map((beer) => beer.brewery))].length,
        countriesCount: [...new Set(beers.map((beer) => beer.country))].length,
        avgRating: Number((beers.reduce((acc, cur) => acc + cur.userRating, 0) / beers.length).toPrecision(3)),
      })
    }
    return () => {
      setStatistics({
        checkinsCount: 0,
        beersCount: 0,
        stylesCount: 0,
        breweriesCount: 0,
        countriesCount: 0,
        avgRating: 0,
      })
    }
  }, [beers])
  return [statistics]
}
