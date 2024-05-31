import { CacheService } from 'infra/Cache/Cache.services'
import { CacheKeys } from 'infra/Cache/types'
import { HttpClient } from 'infra/httpClient'
import { RawPodcastsListData } from './types'

class PodcastsService {
  private httpClient: HttpClient
  private cacheService: CacheService

  private cachedPodcasts: { expire: number; data: RawPodcastsListData }

  constructor(httpClient: HttpClient, cacheService: CacheService) {
    this.httpClient = httpClient
    this.cacheService = cacheService

    this.cachedPodcasts = this.cacheService.read() || {
      expires: null,
      data: null,
    }
  }

  getPodcasts(): Promise<RawPodcastsListData> {
    const count = 100

    return this.httpClient.get<RawPodcastsListData>(
      `toppodcasts/limit=${count}/genre=1310/json`
    )
  }

  getCachedPodcasts(): RawPodcastsListData {
    return this.cachedPodcasts.data
  }

  setCachedPodcasts(data: RawPodcastsListData) {
    this.cachedPodcasts = {
      expire: this.cacheService.getTomorrowTimestamp(),
      data,
    }

    this.cacheService.save(this.cachedPodcasts)
  }

  hasCachedPodcastsExpired() {
    return this.cacheService.hasCacheExpired(this.cachedPodcasts.expire)
  }
}

const httpClient = new HttpClient('https://itunes.apple.com/us/rss/')
const cacheService = new CacheService(CacheKeys.PODCASTS)
const podcastsService = new PodcastsService(httpClient, cacheService)

export { podcastsService, PodcastsService }
