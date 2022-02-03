import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Flex, Container, Center, Link } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import Header from '../components/Header';
import User from '../components/User';
import DrinkingPattern from '../components/DrinkingPattern';
import axios from 'axios';
import TopBeers from '../components/TopBeers';
import TopRegions from '../components/TopRegions';
import TopStyles from '../components/TopStyles';
import dayjs from 'dayjs';
import Statistics from '../components/Statistics';
import DatePickerContainer from '../components/DatePickerContainer';
import ActivityContainer from '../components/Activity/ActivityContainer';
import Sessions from '../components/Sessions';
import BeerTable from '../components/BeerTable';
import TopCountries from '../components/TopCountries';
import TopBreweries from '../components/TopBreweries';

import { IUser } from '../types/IUser';
import { IBeers } from '../types/IBeers';
import { useRouter } from 'next/router';

type ErrorMessage = {
  error: string;
};

const Home: NextPage = () => {
  const [beers, setBeers] = useState<IBeers[]>([]);
  const [user, setUser] = useState<IUser>();
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fetchBeers = async (url: string): Promise<IBeers[] | ErrorMessage> => {
    setIsLoading(true);
    const response = await axios.get(`api/beer/${url}`);
    console.log('response beer', response);
    const data = response.data;
    const beers = data.beers.items;
    if (data.total_count > 50) {
      let endpoints = [...Array(Math.floor(data.total_count / 50)).keys()].map(
        (key) => 'api/beer/' + url + '&offset=' + (key + 1) * 50
      );
      const allResponses = await axios.all(
        endpoints.map((endpoint) => axios.get(endpoint))
      );
      const allBeers = allResponses
        .map((response) => response.data.beers.items)
        .reduce((a, b) => a.concat(b), []);
      setIsLoading(false);
      return beers.concat(allBeers);
    } else {
      setIsLoading(false);
      return beers;
    }
  };

  const fetchUser = async (username: string): Promise<IUser | ErrorMessage> => {
    setIsLoading(true);
    const response = await axios.get(`api/user/${username}`);
    console.log('response user', response);
    setIsLoading(false);
    return response.data;
  };

  const fetchAll = async (username: string) => {
    const now = dayjs();
    const weekAgo = dayjs().subtract(7, 'days');
    const userData = await fetchUser(username);
    if ('error' in userData) {
      Notification(userData.error);
      router.push({
        pathname: `/`,
      });
      return;
    }
    const allBeersData = await fetchBeers(
      `${username}?start_date=${weekAgo.format(
        'YYYY-MM-DD'
      )}&end_date=${now.format('YYYY-MM-DD')}`
    );
    if ('error' in allBeersData) {
      Notification(allBeersData.error);
    }
    if (!('error' in userData) && !('error' in allBeersData)) {
      setStartDate(weekAgo);
      setEndDate(now);
      setUser(userData as IUser);
      setBeers(allBeersData as IBeers[]);
    }
  };

  const fetchBeersForRange = async (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ) => {
    if (!user) {
      Notification('no user');
    }
    if (user) {
      const allBeersData = await fetchBeers(
        `${user.user_name}?start_date=${dayjs(startDate).format(
          'YYYY-MM-DD'
        )}&end_date=${dayjs(endDate).format('YYYY-MM-DD')}`
      );

      if ('error' in allBeersData) {
        Notification(allBeersData.error);
      }
      if (!('error' in allBeersData)) {
        console.log('allBeersData', allBeersData);
        setStartDate(startDate);
        setEndDate(endDate);
        setBeers(allBeersData as IBeers[]);
      }
    }
  };

  const Notification = (message: string) => {
    const toast = createStandaloneToast({});

    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });

    return <></>;
  };

  useEffect(() => {
    if (typeof router.query.username === 'string') {
      fetchAll(router.query.username);
    }
  }, [router.query.username]);

  return (
    <div>
      <Head>
        <title>{router.query.username} on Unstappt </title>
      </Head>
      <Flex bg='gray.100' flexDir='column' flexWrap='wrap' minH='100vh'>
        {((beers && user) || isLoading) && (
          <>
            <Container maxW={['container.sm', 'container.md', 'container.lg']}>
              <User isLoading={isLoading} user={user} />
              <DatePickerContainer
                fetchBeersForRange={fetchBeersForRange}
                isLoading={isLoading}
                startDate={startDate.$d}
                endDate={endDate.$d}
              />
              <Statistics beers={beers} isLoading={isLoading} />
              <ActivityContainer
                isLoading={isLoading}
                beers={beers}
                startDate={startDate}
                endDate={endDate}
              />
              <Flex
                flexWrap='wrap'
                justifyContent='space-between'
                gridColumnGap={2}
                alignItems='flex-start'
              >
                <TopBeers beersData={beers} isLoading={isLoading} />
                <TopBreweries beers={beers} isLoading={isLoading} />
                <TopStyles beers={beers} isLoading={isLoading} />
                <TopCountries beers={beers} isLoading={isLoading} />
                <TopRegions beers={beers} isLoading={isLoading} />
              </Flex>
              <DrinkingPattern beers={beers} isLoading={isLoading} />
              <Sessions beers={beers} isLoading={isLoading} />
              <BeerTable beers={beers} isLoading={isLoading} user={user} />
            </Container>
          </>
        )}
        <Center py={4} mt='auto'>
          Author:&nbsp;
          <Link
            color='blue.400'
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/beaverd2'
          >
            beaverd2
          </Link>
        </Center>
      </Flex>
    </div>
  );
};

export default Home;
