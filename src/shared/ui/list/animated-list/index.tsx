import React from 'react'
import {AnimatePresence} from 'framer-motion'
import Item from '../item'
import {Beer, Brewery, Country, Region, Style} from 'shared/types/data'

interface ListProps {
  data: Beer[] | Brewery[] | Country[] | Region[] | Style[]
  isLoading: boolean
  filter: string
  asLinks?: boolean
}

export const AnimatedList = ({data, isLoading, filter, asLinks}: ListProps) => {
  return (
    <>
      <AnimatePresence>
        {!isLoading &&
          data.map((data: any) => (
            <Item
              key={data.name}
              data={{
                name: data.name,
                name2: data?.brewery || data?.country,
                img: data?.img,
                url: data?.url,
                count: data?.count,
                rating: data?.userRating || data?.avgRating,
              }}
              filter={filter}
              asLinks={asLinks ? true : false}
            />
          ))}
        {isLoading && Array.from(Array(5).keys()).map((elem) => <Item key={elem} skeleton />)}
      </AnimatePresence>
    </>
  )
}
