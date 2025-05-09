import React, { Suspense } from 'react'
import { Stats } from './stats'
import { User } from '@/widgets/user'
import { UserStorage } from '@/widgets/user-storage'
import { StatsSkeleton } from '@/widgets/stats-skeleton'
import { Metadata } from 'next'
import { fetchUser } from '@/shared/api'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | undefined }
}

const getUser = async (username: string) => {
  return await fetchUser(username)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  return {
    title: `${username} on Unstappt`,
  }
}

export default async function Page({ params, searchParams }: Props) {
  const user = await getUser(params.username)

  return (
    <>
      <UserStorage user={user} />
      <User user={user} />
      <Suspense key={`${searchParams?.endDate}-${searchParams?.endDate}`} fallback={<StatsSkeleton />}>
        <Stats username={params.username} startDate={searchParams?.startDate} endDate={searchParams?.endDate} />
      </Suspense>
    </>
  )
}
