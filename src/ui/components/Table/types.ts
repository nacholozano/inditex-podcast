export type Item = {
  /* id: string */
  path?: string
} & Record<string, string>

export type Props = {
  headers: {
    code: string
    key: string
    name: string
    align?: 'left' | 'right' | 'center'
  }[]
  data: Item[]
}
