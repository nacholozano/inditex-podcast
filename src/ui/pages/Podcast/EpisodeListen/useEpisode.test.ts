import { renderHook, waitFor } from '@testing-library/react'
import Application from 'application'
import useEpisode from './useEpisode'
import { Episode } from 'domain/Episode/Episode'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ podcastId: '1', episodeId: '2' }),
}))

jest.mock('dompurify', () => ({
  sanitize: (value: string) => `${value}`,
}))

describe('usePodcastsList', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('init hook', async () => {
    const spyGetEpisode = jest
      .spyOn(Application, 'getEpisode')
      .mockReturnValue(Promise.resolve(new Episode({})))

    const { result } = renderHook(useEpisode)

    const episode = result.current.episode

    expect(episode.id).toBeNull()
    expect(spyGetEpisode).toHaveBeenCalledWith({
      podcastId: '1',
      episodeId: '2',
    })
    await waitFor(() => expect(spyGetEpisode).toHaveBeenCalledTimes(1))
  })

  test('get data', async () => {
    const spyGetEpisode = jest.spyOn(Application, 'getEpisode').mockReturnValue(
      Promise.resolve(
        new Episode({
          id: '1',
          title: 'First',
          description: '',
          duration: 0,
          date: '',
          audio: 'url.com/audio',
        })
      )
    )

    const { result } = renderHook(useEpisode)

    await waitFor(() => expect(spyGetEpisode).toHaveBeenCalledTimes(1))

    const { id, title, description, duration, date, audio } =
      result.current.episode

    expect({ id, title, description, duration, date, audio }).toEqual({
      id: '1',
      title: 'First',
      description: '',
      duration: null,
      date: '',
      audio: 'url.com/audio',
    })
  })
})
