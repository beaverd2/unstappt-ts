import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import TopList from './TopList/TopList';
import { IBeers } from '../types/IBeers';

interface TopBeersProps {
  beersData: IBeers[];
  isLoading: boolean;
}
interface Beers {
  name: string;
  name2: string;
  img: string;
  avgRating: number;
  url: string;
}

const TopBeers: React.FC<TopBeersProps> = ({ beersData, isLoading }) => {
  const [isCompact, setIsCompact] = useState(true);
  const [beers, setBeers] = useState<Beers[]>([]);
  const showButton = !isLoading && isCompact && beers.length > 5;

  const handleIsCompact = () => {
    setIsCompact(false);
  };

  useEffect(() => {
    setIsCompact(true);
    if (beersData) {
      const beers = beersData.map((beer) => {
        return {
          name: beer.beer.beer_name,
          name2: beer.brewery.brewery_name,
          img: beer.beer.beer_label,
          avgRating: beer.rating_score,
          url: '/b/' + beer.brewery.brewery_slug + '/' + beer.beer.bid,
        };
      });
      setBeers(
        beers.sort(
          (a, b) => b.avgRating - a.avgRating || a.name.localeCompare(b.name)
        )
      );
    }
  }, [beersData]);

  return (
    <Flex
      bgColor='white'
      p={2}
      shadow='base'
      flexDirection='column'
      width={['100%', '49%']}
      marginTop={4}
      borderRadius='base'
    >
      <Flex justifyContent='space-between' alignItems='center' marginBottom={4}>
        <Heading size='sm'>Top Beers</Heading>
      </Flex>
      <TopList
        data={beers}
        isLoading={isLoading}
        isCompact={isCompact}
        filter={'rating'}
        hoverable
      />
      {showButton && (
        <Button
          onClick={handleIsCompact}
          size='xs'
          alignSelf='center'
          width={24}
          variant='outline'
          mt='auto'
        >
          Load more
        </Button>
      )}
    </Flex>
  );
};

export default memo(TopBeers);
