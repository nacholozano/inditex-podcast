import { renderHook } from '@testing-library/react'
import { Podcast } from 'domain/Podcast/Podcast'
import useEpisodes from './useEpisodes'
import { Episode } from 'domain/Episode/Episode'

describe('useEpisodes', () => {
  test('no episodes', async () => {
    const { result } = renderHook(useEpisodes, {
      initialProps: {
        podcast: new Podcast({ episodes: [] }),
      },
    })

    const episodes = result.current.episodes
    const firstEpisode = episodes[0]

    expect(episodes).toHaveLength(9)
    expect(firstEpisode.name.value).toBe('- - -')
  })

  test('get episodes', async () => {
    const { result } = renderHook(useEpisodes, {
      initialProps: {
        podcast: new Podcast({
          episodes: [
            new Episode({
              id: '1',
              title: 'Episode 1',
              duration: 777777,
              date: new Date(2020, 9, 3).toString(),
            }),
            new Episode({
              id: '2',
              title: 'Episode 2',
              duration: 123456,
              date: new Date(2021, 9, 3).toString(),
            }),
          ],
        }),
      },
    })

    const episodes = result.current.episodes
    const episode1 = (() => {
      const { id, name, duration, date } = episodes[0]
      return { id, name, duration, date }
    })()

    const episode2 = (() => {
      const { id, name, duration, date } = episodes[1]
      return { id, name, duration, date }
    })()

    expect(episodes).toHaveLength(2)
    expect(episode1).toEqual({
      id: { value: '1' },
      name: { value: 'Episode 1', path: 'episode/1' },
      duration: { value: '12:58' },
      date: { value: '10/3/2020' },
    })

    expect(episode2).toEqual({
      id: { value: '2' },
      name: { value: 'Episode 2', path: 'episode/2' },
      duration: { value: '2:04' },
      date: { value: '10/3/2021' },
    })
  })
})
