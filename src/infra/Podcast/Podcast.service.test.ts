import { HttpClient } from 'infra/httpClient'
import { CacheService } from 'infra/Cache/Cache.services'
import { PodcastService } from './Podcast.service'
import { RawPodcastData } from './types'

const response: Response = {
  ok: true,
  json: () => Promise.resolve({ data: null }),
} as Response

global.fetch = jest.fn(() => Promise.resolve(response))

describe('Podcast service', () => {
  let httpClient: HttpClient
  let cacheService: CacheService
  let podcastService: PodcastService

  beforeEach(() => {
    httpClient = new HttpClient('')
    cacheService = new CacheService('key')
  })

  test('no cached data', () => {
    const cacheReadMock = jest.spyOn(cacheService, 'read')
    cacheReadMock.mockReturnValue(null)

    podcastService = new PodcastService(httpClient, cacheService)

    expect(podcastService.getCachedPodcast({ id: '1' })).toEqual({
      results: [],
    })
  })

  test('get cached data', () => {
    const cacheReadMock = jest.spyOn(cacheService, 'read')
    cacheReadMock.mockReturnValue({
      '1': {
        data: 'cached data',
      },
    })

    podcastService = new PodcastService(httpClient, cacheService)

    expect(podcastService.getCachedPodcast({ id: '1' })).toBe('cached data')
  })

  test('set cached data', () => {
    const cacheReadMock = jest.spyOn(cacheService, 'read')
    cacheReadMock.mockReturnValue(null)

    podcastService = new PodcastService(httpClient, cacheService)

    const cacheSaveMock = jest.spyOn(cacheService, 'save')

    const cacheTomorrowTimestampMock = jest.spyOn(
      cacheService,
      'getTomorrowTimestamp'
    )
    cacheTomorrowTimestampMock.mockReturnValue(123)

    const dataToSave: RawPodcastData = {
      results: [
        {
          trackId: 1,
          trackName: 'name',
          artistName: 'artist',
          episodeUrl: 'url',
          artworkUrl100: '',
          artworkUrl600: '',
          description: 'desc',
          releaseDate: '123',
          trackCount: 32,
          wrapperType: 'podcastEpisode',
          trackTimeMillis: 10000,
        },
      ],
    }
    podcastService.setCachedPodcast({ id: '1', data: dataToSave })

    expect(cacheSaveMock).toHaveBeenCalledWith({
      '1': {
        expire: 123,
        data: dataToSave,
      },
    })
  })

  test('get podcast', () => {
    podcastService = new PodcastService(httpClient, cacheService)
    const spyGet = jest.spyOn(httpClient, 'get')

    podcastService.getPodcast({ id: '222' })

    expect(spyGet).toHaveBeenCalledWith(
      '/lookup?id=222&media=podcast&entity=podcastEpisode&limit=20'
    )
  })

  test('cache expired podcast by expire date', () => {
    jest.spyOn(cacheService, 'read').mockReturnValue({
      expire: 123,
      data: { trackId: 345 },
    })

    podcastService = new PodcastService(httpClient, cacheService)

    jest.spyOn(cacheService, 'hasCacheExpired').mockReturnValue(true)

    const result = podcastService.hasCachedPodcastsExpired({ id: '1' })

    expect(result).toBe(true)
  })

  test('cache expired podcast by no cached podcast', () => {
    jest.spyOn(cacheService, 'read').mockReturnValue(undefined)

    podcastService = new PodcastService(httpClient, cacheService)

    const result = podcastService.hasCachedPodcastsExpired({ id: '1' })

    expect(result).toBe(true)
  })
})
