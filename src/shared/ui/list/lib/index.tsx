import { Beer, Brewery, Country, Region, Style } from 'shared/types/data'

export const formatItem = (item: Beer | Brewery | Country | Region | Style) => ({
  name: item.name,
  name2: ('brewery' in item && item.brewery) || ('country' in item && item.country) || undefined,
  img: ('img' in item && item.img) || undefined,
  url: ('url' in item && item.url) || undefined,
  count: item?.count,
  rating: ('userRating' in item && item.userRating) || ('avgRating' in item && item.avgRating) || undefined,
})

export const getShortStyles = (styles: Style[]) => {
  const obj: Record<string, Style> = {}
  for (const style of styles) {
    const name = style.name.split('-')[0]
    if (obj[name] === undefined) {
      obj[name] = {
        name: name,
        sumRating: style.sumRating,
        avgRating: style.avgRating,
        count: style.count,
      }
    }
    obj[name].count += style.count
    obj[name].sumRating += style.sumRating
    obj[name].avgRating = obj[name].sumRating / obj[name].count
  }
  return Object.values(obj)
}

export const filterSort = (items: any[], filter?: 'count' | 'rating' | null) =>
  filter
    ? filter === 'count'
      ? [...items].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ru-RU'))
      : [...items].sort((a, b) => b.avgRating - a.avgRating || a.name.localeCompare(b.name, 'ru-RU'))
    : items
