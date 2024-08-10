import { CacheService } from 'infra/Cache/Cache.services'
import { PodcastService } from 'infra/Podcast/Podcast.service'
import { HttpClient } from 'infra/httpClient'
import getPodcast from 'application/GetPodcast/GetPodcast'
import { RawPodcastData } from 'infra/Podcast/types'

const mockedData: RawPodcastData = {
  results: [
    {
      wrapperType: 'track',
      artistName: 'you',
      description: '',
      episodeUrl: 'url.com/poscast/1',
      trackName: 'name',
      trackId: 1,
      trackCount: 3,
      trackTimeMillis: 0,
      releaseDate: '2020-08-07',
      artworkUrl100: '100.png',
      artworkUrl600: '600.png',
    },
    {
      wrapperType: 'podcastEpisode',
      artistName: 'you',
      description: '',
      episodeUrl: 'url.com/poscast/1/episode/8',
      trackName: 'name',
      trackId: 1,
      trackCount: 3,
      trackTimeMillis: 1000,
      releaseDate: '2020-08-07',
      artworkUrl100: '100.png',
      artworkUrl600: '600.png',
    },
  ],
}

describe('GetPodcast use case', () => {
  let httpClient: HttpClient
  let podcastService: PodcastService
  let cacheService: CacheService
  let getPodcastWithService: ReturnType<typeof getPodcast>

  beforeEach(() => {
    httpClient = new HttpClient('')
    cacheService = new CacheService('')
    podcastService = new PodcastService(httpClient, cacheService)
    getPodcastWithService = getPodcast(podcastService)
  })

  test('get cached data', async () => {
    const spyHasCachedPodcastsExpired = jest
      .spyOn(podcastService, 'hasCachedPodcastsExpired')
      .mockReturnValue(false)

    jest.spyOn(podcastService, 'getCachedPodcast').mockReturnValue(mockedData)

    const { author, id, img, name, desc, totalEpisode, episodes } =
      await getPodcastWithService({ id: '3' })

    expect(spyHasCachedPodcastsExpired).toHaveBeenCalledWith({
      id: '3',
    })

    const episodesObject = episodes.map(
      ({ id, title, date, duration, description, audio }) => ({
        id,
        title,
        date,
        duration,
        description,
        audio,
      })
    )

    expect({
      author,
      id,
      img,
      name,
      desc,
      totalEpisode,
      episodes: episodesObject,
    }).toEqual({
      author: 'you',
      id: '1',
      img: '600.png',
      name: 'name',
      desc: '',
      totalEpisode: 3,
      episodes: [
        {
          id: '1',
          title: 'name',
          date: '2020-08-07',
          duration: 1000,
          description: '',
          audio: 'url.com/poscast/1/episode/8',
        },
      ],
    })
  })

  test('get data from api', async () => {
    const podcastPromise: Promise<RawPodcastData> = new Promise((resolve) =>
      resolve(mockedData)
    )

    jest.spyOn(podcastService, 'getPodcast').mockReturnValue(podcastPromise)

    const setCachedPodcastMock = jest.spyOn(podcastService, 'setCachedPodcast')

    const { author, id, img, name, desc, totalEpisode, episodes } =
      await getPodcastWithService({ id: '1' })

    expect(setCachedPodcastMock).toHaveBeenCalledWith({
      id: '1',
      data: mockedData,
    })

    const episodesObject = episodes.map(
      ({ id, title, date, duration, description, audio }) => ({
        id,
        title,
        date,
        duration,
        description,
        audio,
      })
    )

    expect({
      author,
      id,
      img,
      name,
      desc,
      totalEpisode,
      episodes: episodesObject,
    }).toEqual({
      author: 'you',
      id: '1',
      img: '600.png',
      name: 'name',
      desc: '',
      totalEpisode: 3,
      episodes: [
        {
          id: '1',
          title: 'name',
          date: '2020-08-07',
          duration: 1000,
          description: '',
          audio: 'url.com/poscast/1/episode/8',
        },
      ],
    })
  })
})
