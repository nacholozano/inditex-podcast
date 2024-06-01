import { TableItemValue } from 'ui/components/Table/types'

export type Episode = {
  name: TableItemValue
  date: TableItemValue
  duration: TableItemValue
}

export type Props = {
  count: number
  episodes: Episode[]
}
