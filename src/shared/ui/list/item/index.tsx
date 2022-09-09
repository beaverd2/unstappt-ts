import React, {memo} from 'react'
import {Flex} from '@chakra-ui/layout'
import {Image, Skeleton, Text} from '@chakra-ui/react'
import {motion} from 'framer-motion'

interface ItemProps {
  data?: any
  filter?: string
  skeleton?: boolean
  asLinks?: boolean
}

const Item = ({data, filter, skeleton, asLinks}: ItemProps) => {
  const MotionFlex = motion(Flex)

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  if (skeleton) {
    return (
      <MotionFlex alignItems="flex-start" marginBottom={4} initial={{opacity: 0}} animate={{opacity: 1}}>
        <Skeleton w="3rem" h="3rem" marginRight={1} alignSelf="center" />

        <Flex flexDir="column" w="80%">
          <Skeleton h={4} mb={3} w="70%" />
          <Skeleton h={4} w="20%" />
        </Flex>
      </MotionFlex>
    )
  }
  return (
    <MotionFlex
      alignItems="flex-start"
      marginBottom={4}
      backgroundColor="white"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      whileHover={
        asLinks
          ? {
              backgroundColor: asLinks && '#EDF2F7',
              transition: {duration: 0.2},
            }
          : {}
      }
      cursor={asLinks ? 'pointer' : 'auto'}
      onClick={() => data?.url && openInNewTab(data.url)}
    >
      {data?.img && (
        <Image alt="logo" src={data.img} boxSize="2.5rem" objectFit="cover" marginRight={4} alignSelf="center" />
      )}

      <Flex flexDir="column" w="80%">
        <Text isTruncated>{data?.name}</Text>
        <Text isTruncated>{data?.name2 && data.name2}</Text>
        {filter === 'count' && <Text>{data?.count} Total</Text>}
        {filter === 'rating' && data?.rating && <Text>rating: {Number(data.rating.toPrecision(3))}</Text>}
      </Flex>
    </MotionFlex>
  )
}

export default memo(Item, (next, prev) => next.filter === prev.filter && next.data?.count === prev.data?.count)
