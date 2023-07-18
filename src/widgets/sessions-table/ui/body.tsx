import {TableData} from '../model'
import {format} from 'date-fns'
import {TableBody, TableCell, TableRow} from 'shared/ui/table'

type Props = {
  data: TableData
}

export const Body = ({data}: Props) => {
  return (
    <TableBody>
      {data.map((data) => (
        <TableRow key={`${data.startTime}-${data.endTime}`}>
          {Object.entries(data).map(([key, value]) => (
            <TableCell key={key} data-numeric={key === 'total'}>
              {key !== 'total' ? format(new Date(value), 'dd MMM yyyy HH:mm') : value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
