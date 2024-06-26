export type TableItemValue = { value: string; path?: string }

export type TableItem = { id: TableItemValue } & Record<string, TableItemValue>

export type Props = {
  headers: {
    code: string
    key: string
    name: string
    align?: 'left' | 'right' | 'center'
    oneLine?: boolean
  }[]
  data: TableItem[]
}
