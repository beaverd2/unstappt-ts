import {Flex} from '@chakra-ui/react'
import React from 'react'

interface BlockProps {
  width?: string[] | string
  display?: string
  flexDirection?: 'column' | 'row'
  children?: React.ReactNode
}

export const Block = ({width = '100', display = 'flex', flexDirection = 'column', children}: BlockProps) => {
  return (
    <Flex
      bgColor="white"
      p={2}
      shadow="base"
      flexDirection={flexDirection}
      width={width}
      marginTop={4}
      borderRadius="base"
      display={display}
    >
      {children}
    </Flex>
  )
}
