export type Episode = {
  name: { value: string; path?: string }
  date: { value: string }
  duration: { value: string }
}

export type Props = {
  count: number
  episodes: Episode[]
}
