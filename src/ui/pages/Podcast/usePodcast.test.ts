import { renderHook, waitFor } from '@testing-library/react'
import { Podcast } from 'domain/Podcast/Podcast'
import Application from 'application'
import usePodcast from './usePodcast'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ podcastId: '1' }),
}))

describe('usePodcastsList', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('init hook', async () => {
    const spyGetEpisode = jest
      .spyOn(Application, 'getPodcast')
      .mockReturnValue(Promise.resolve(new Podcast({})))

    const { result } = renderHook(usePodcast)

    const podcast = result.current.podcast

    expect(podcast.id).toBeNull()
    expect(spyGetEpisode).toHaveBeenCalledWith({
      id: '1',
    })
    await waitFor(() => expect(spyGetEpisode).toHaveBeenCalledTimes(1))
  })

  test('get data', async () => {
    const spyGetPodcast = jest.spyOn(Application, 'getPodcast').mockReturnValue(
      Promise.resolve(
        new Podcast({
          id: '1',
          name: 'Science',
          author: 'Pepe',
          desc: '',
          episodes: [],
          img: 'img.png',
          totalEpisode: 0,
        })
      )
    )

    const { result } = renderHook(usePodcast)

    await waitFor(() => expect(spyGetPodcast).toHaveBeenCalledTimes(1))

    const { id, name, author, desc, episodes, img, totalEpisode } =
      result.current.podcast

    expect({ id, name, author, desc, episodes, img, totalEpisode }).toEqual({
      id: '1',
      name: 'Science',
      author: 'Pepe',
      desc: '',
      episodes: [],
      img: 'img.png',
      totalEpisode: 0,
    })
  })
})
