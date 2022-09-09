import React from 'react'
import {Flex, Skeleton, Text} from '@chakra-ui/react'

interface ItemProps {
  label: string
  count: number
  isLoading: boolean
}

export const Item = ({label, count, isLoading}: ItemProps) => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      bgColor="white"
      p={2}
      shadow="base"
      flexBasis="40%"
      textAlign="center"
      borderRadius="base"
    >
      {isLoading ? (
        <Skeleton h={14} w="100%" />
      ) : (
        <>
          <Text fontSize="lg">{label}</Text>
          <Text fontSize="lg" fontWeight="700">
            {count}
          </Text>
        </>
      )}
    </Flex>
  )
}
