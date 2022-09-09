import {Box, Flex, Heading} from '@chakra-ui/layout'
import {Container, Input} from '@chakra-ui/react'
import React, {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

export const Header: React.FC = () => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleInput = (e: React.SyntheticEvent<EventTarget>) => {
    setSearch((e.target as HTMLInputElement).value)
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    router.push({
      pathname: `/` + search,
    })
    setSearch('')
  }
  return (
    <Box bgColor="#FFBA2E" w="100%">
      <Container maxW={['container.sm', 'container.md', 'container.lg']}>
        <Flex height={12} alignItems="center" justifyContent="space-between">
          <Heading>
            <Link href="/">Unstappt</Link>
          </Heading>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="username"
              size="xs"
              bgColor="white"
              maxW={36}
              borderRadius="md"
              value={search}
              onChange={handleInput}
            />
          </form>
        </Flex>
      </Container>
    </Box>
  )
}
