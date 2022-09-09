export const filterSort = (items: any[], filter: 'count' | 'rating' | null) =>
  filter
    ? filter === 'count'
      ? [...items].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      : [...items].sort((a, b) => b.avgRating - a.avgRating || a.name.localeCompare(b.name))
    : items
