import {Flex, Link} from '@chakra-ui/layout'
import React from 'react'
import {Avatar, Text} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons'
import {Skeleton, SkeletonCircle} from '@chakra-ui/react'
import {Block} from 'shared/ui/block'
import {User as UserType} from 'shared/types/data'
import {format} from 'date-fns'

interface UserProps {
  user: UserType
  isLoading: boolean
}

export const User = ({user, isLoading}: UserProps) => {
  return (
    <Flex mb={2} mt={4}>
      <Block width="100%" flexDirection="row">
        {!isLoading ? (
          <>
            <Avatar src={user.avatar} size="lg" marginRight={2} alignSelf="center" />
            <Flex flexGrow={1} flexDir="column">
              <Flex justifyContent="space-between">
                <Flex flexDir="column">
                  <Flex>
                    <Text>{user.firstName + ' ' + user.lastName}</Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.500">
                    {user.username}
                  </Text>
                </Flex>
                <Flex flexDir="column" alignItems="center">
                  <Text>Total</Text>
                  <Text fontWeight="700">{user.checkins}</Text>
                </Flex>
                <Flex flexDir="column" alignItems="center">
                  <Text>Unique</Text>
                  <Text fontWeight="700">{user.beers}</Text>
                </Flex>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text color="gray.500">
                  Joined {user.joinedDate && format(new Date(user.joinedDate), 'd MMM yyyy')}
                </Text>
                <Link target="_blank" rel="noopener noreferrer" href={'https://untappd.com/user/' + user.username}>
                  <ChevronRightIcon w={6} h={6} />
                </Link>
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <SkeletonCircle size="16" marginRight={2} alignSelf="center" />
            <Flex flexGrow={1} flexDir="column">
              <Flex justifyContent="space-between">
                <Flex flexDir="column">
                  <Skeleton height={5} width={20} mb={2}></Skeleton>
                  <Skeleton height={4} width={14}></Skeleton>
                </Flex>
                <Flex flexDir="column" alignItems="center">
                  <Skeleton height={5} width={12} mb={2}></Skeleton>
                  <Skeleton height={5} width={10}></Skeleton>
                </Flex>
                <Flex flexDir="column" alignItems="center">
                  <Skeleton height={5} width={12} mb={2}></Skeleton>
                  <Skeleton height={5} width={10}></Skeleton>
                </Flex>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Skeleton height={4} width={44} mt={1}></Skeleton>
                <ChevronRightIcon w={6} h={6} mt={1} />
              </Flex>
            </Flex>
          </>
        )}
      </Block>
    </Flex>
  )
}
