import {Style} from 'shared/types/data'
import {List} from 'shared/ui/list'

type Props = {
  loading: boolean
  styles: Style[]
}

export const Styles = ({loading, styles}: Props) => {
  return <List data={styles} style loading={loading} />
}
