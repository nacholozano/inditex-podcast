import { CacheService } from 'infra/Cache/Cache.services'
import { PodcastService } from 'infra/Podcast/Podcast.service'
import { HttpClient } from 'infra/httpClient'
import getEpisode from 'application/GetEpisode/GetEpisode'
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

describe('GetEpisode use case', () => {
  let httpClient: HttpClient
  let podcastService: PodcastService
  let cacheService: CacheService
  let getEpisodeWithService: ReturnType<typeof getEpisode>

  beforeEach(() => {
    httpClient = new HttpClient('')
    cacheService = new CacheService('')
    podcastService = new PodcastService(httpClient, cacheService)
    getEpisodeWithService = getEpisode(podcastService)
  })

  test('get episode', async () => {
    const spyGetCachedPodcast = jest
      .spyOn(podcastService, 'getCachedPodcast')
      .mockReturnValue(mockedData)

    const { id, title, description, audio } = await getEpisodeWithService({
      podcastId: '1',
      episodeId: '1',
    })

    expect(spyGetCachedPodcast).toHaveBeenCalledWith({ id: '1' })
    expect({
      id,
      title,
      description,
      audio,
    }).toEqual({
      id: '1',
      title: 'name',
      description: '',
      audio: 'url.com/poscast/1/episode/8',
    })
  })
})
