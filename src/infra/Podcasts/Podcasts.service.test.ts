import { HttpClient } from 'infra/httpClient'
import { CacheService } from 'infra/Cache/Cache.services'
import { PodcastsService } from './Podcasts.service'
import { PodcastList } from './types'

describe('Podcasts service', () => {
  let httpClient: HttpClient
  let cacheService: CacheService
  let podcastsService: PodcastsService

  beforeEach(() => {
    httpClient = new HttpClient('')
    cacheService = new CacheService('key')
  })

  test('no cached data', () => {
    const cacheReadMock = jest.spyOn(cacheService, 'read')
    cacheReadMock.mockReturnValue(null)

    podcastsService = new PodcastsService(httpClient, cacheService)

    expect(podcastsService.getCachedPodcasts()).toBeNull()
  })

  test('get cached data', () => {
    const cacheReadMock = jest.spyOn(cacheService, 'read')
    cacheReadMock.mockReturnValue({ data: 'podcast array' })

    podcastsService = new PodcastsService(httpClient, cacheService)

    expect(podcastsService.getCachedPodcasts()).toBe('podcast array')
  })

  test('set cached data', () => {
    podcastsService = new PodcastsService(httpClient, cacheService)

    const cacheSaveMock = jest.spyOn(cacheService, 'save')

    const cacheTomorrowTimestampMock = jest.spyOn(
      cacheService,
      'getTomorrowTimestamp'
    )
    cacheTomorrowTimestampMock.mockReturnValue(123)

    const dataToSave = {
      feed: {
        entry: [{} as PodcastList],
      },
    }
    podcastsService.setCachedPodcasts(dataToSave)

    expect(cacheSaveMock).toHaveBeenCalledWith({
      expire: 123,
      data: dataToSave,
    })
  })
})
