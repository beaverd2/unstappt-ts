import React, { Suspense } from 'react'
import { Stats } from './stats'
import { User as UserType } from 'shared/types/data'
import { mapUserDataToUser } from 'shared/lib/utils'
import { User } from 'widgets/user'
import { StatsSkeleton } from 'widgets/stats-skeleton'
import { Metadata } from 'next'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | undefined }
  // searchParams: { [key: string]: string | string[] | undefined }
}

const getUser = async (username: string): Promise<UserType> => {
  const userResponse = await fetch(`http://localhost:8080/user/${username}`, { next: { revalidate: 10 } })
  const userData = mapUserDataToUser(await userResponse.json())
  return userData
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
      <User user={user} />
      <Suspense key={`${searchParams?.endDate}-${searchParams?.endDate}`} fallback={<StatsSkeleton />}>
        <Stats username={params.username} startDate={searchParams?.startDate} endDate={searchParams?.endDate} />
      </Suspense>
    </>
  )
}
