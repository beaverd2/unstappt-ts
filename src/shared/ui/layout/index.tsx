import {Center, Flex, Link} from '@chakra-ui/react'
import React from 'react'
import {Header} from '../header'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      <Header />
      <Flex bg="gray.100" flexDir="column" flexWrap="wrap" minH="calc(100vh - 3rem)">
        {children}
        <Center w="100%" py={4} mt="auto">
          <span style={{width: 'fit-content'}}>
            Author:&nbsp;
            <Link color="blue.400" target="_blank" rel="noopener noreferrer" href="https://github.com/beaverd2">
              beaverd2
            </Link>
          </span>
        </Center>
      </Flex>
    </>
  )
}
