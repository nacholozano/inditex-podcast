import { CacheService } from 'infra/Cache/Cache.services'
import { CacheKeys } from 'infra/Cache/types'
import { HttpClient } from 'infra/httpClient'
import { RawPodcastData } from './types'

class PodcastService {
  private httpClient: HttpClient
  private cacheService: CacheService

  private cachedPodcast: Record<
    string,
    { expire: number; data: RawPodcastData }
  >

  constructor(httpClient: HttpClient, cacheService: CacheService) {
    this.httpClient = httpClient
    this.cacheService = cacheService

    this.cachedPodcast = this.cacheService.read() || {}
  }

  getPodcast({ id }: { id: string }): Promise<RawPodcastData> {
    return this.httpClient.get<RawPodcastData>(
      `/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    )
  }

  getCachedPodcast({ id }: { id: string }): RawPodcastData {
    return this.cachedPodcast[id]
      ? this.cachedPodcast[id].data
      : { results: [] }
  }

  setCachedPodcast({ id, data }: { id: string; data: RawPodcastData }) {
    this.cachedPodcast[id] = {
      expire: this.cacheService.getTomorrowTimestamp(),
      data,
    }

    this.cacheService.save(this.cachedPodcast)
  }

  hasCachedPodcastsExpired({ id }: { id: string }) {
    const cachedPodcast = this.cachedPodcast[id]

    return (
      !cachedPodcast || this.cacheService.hasCacheExpired(cachedPodcast.expire)
    )
  }
}

const httpClient = new HttpClient('https://itunes.apple.com')
const cacheService = new CacheService(CacheKeys.PODCAST)
const podcastService = new PodcastService(httpClient, cacheService)

export { podcastService, PodcastService }
