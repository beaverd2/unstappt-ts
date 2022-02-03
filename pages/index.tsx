import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Center, Link } from '@chakra-ui/react';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Unstappt</title>
      </Head>
      <Flex bg='gray.100' flexDir='column' flexWrap='wrap' minH='100vh'>
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
