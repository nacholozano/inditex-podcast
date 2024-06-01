import { CacheService } from 'infra/Cache/Cache.services'
import { CacheKeys } from 'infra/Cache/types'
import { HttpClient } from 'infra/httpClient'
import { RawPodcastData } from './types'

class PodcastService {
  private httpClient: HttpClient
  private cacheService: CacheService

  constructor(httpClient: HttpClient, cacheService: CacheService) {
    this.httpClient = httpClient
    this.cacheService = cacheService
  }

  getPodcast({ id }: { id: string }): Promise<RawPodcastData> {
    return this.httpClient.get<RawPodcastData>(
      `/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    )
  }
}

const httpClient = new HttpClient('https://itunes.apple.com')
const cacheService = new CacheService(CacheKeys.PODCAST)
const podcastService = new PodcastService(httpClient, cacheService)

export { podcastService, PodcastService }
