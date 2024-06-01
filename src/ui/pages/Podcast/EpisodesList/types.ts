export type Episode = {
  name: string
  date: string
  duration: string
  path: string
}

export type Props = {
  count: number
  episodes: Episode[]
}
