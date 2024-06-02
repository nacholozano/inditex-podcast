export type TableItemValue = { value: string } & { path?: string }

export type TableItem = Record<string, TableItemValue> & { id: string }

export type Props = {
  headers: {
    code: string
    key: string
    name: string
    align?: 'left' | 'right' | 'center'
  }[]
  data: TableItem[]
}
