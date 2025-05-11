import { TableData } from '../model'
import { format } from 'date-fns'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

type Props = {
  data: TableData
  username: string
}

const openInNewTab = (username: string, id: number) => {
  const newWindow = window.open(`https://untappd.com/user/${username}/checkin/${id}`, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const Body = ({ data, username }: Props) => {
  return (
    <TableBody>
      {data.map((data) => (
        <TableRow
          key={data.id}
          className="cursor-pointer hover:bg-accent"
          onClick={() => openInNewTab(username, data.id)}
        >
          {Object.entries(data).map(([key, value]) =>
            key === 'id' ? null : (
              <TableCell key={key} data-numeric={key === 'userRating' || key === 'globalRating'}>
                {key === 'date' ? format(new Date(value), 'dd MMM yyyy HH:mm') : value}
              </TableCell>
            )
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
