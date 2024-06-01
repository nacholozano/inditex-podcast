import { CacheService } from 'infra/Cache/Cache.services'
import { PodcastsService } from 'infra/Podcasts/Podcasts.service'
import { HttpClient } from 'infra/httpClient'
import { RawPodcastsListData } from 'infra/Podcasts/types'
import getPodcastsList from './GetPodcastsList'

const mockedData: RawPodcastsListData = {
  feed: {
    entry: [
      {
        'im:artist': {
          label: 'name',
        },
        id: {
          attributes: {
            'im:id': '123',
          },
        },
        'im:name': {
          label: 'name',
        },
        'im:image': [],
      },
    ],
  },
}

describe('GetPodcastsList use case', () => {
  let httpClient: HttpClient
  let podcastsService: PodcastsService
  let cacheService: CacheService
  let getPodcastsListWithService: ReturnType<typeof getPodcastsList>

  beforeEach(() => {
    httpClient = new HttpClient('')
    cacheService = new CacheService('')
    podcastsService = new PodcastsService(httpClient, cacheService)
    getPodcastsListWithService = getPodcastsList(podcastsService)
  })

  test('get cached data', async () => {
    jest
      .spyOn(podcastsService, 'hasCachedPodcastsExpired')
      .mockReturnValue(false)

    jest.spyOn(podcastsService, 'getCachedPodcasts').mockReturnValue(mockedData)

    const podcasts = await getPodcastsListWithService()
    const { author, id, img, name } = podcasts[0]

    expect(podcasts.length).toBe(1)
    expect({ author, id, img, name }).toEqual({
      author: 'name',
      id: '123',
      img: '',
      name: 'name',
    })
  })

  test('get data from api', async () => {
    const podcastsPromise: Promise<RawPodcastsListData> = new Promise(
      (resolve) => resolve(mockedData)
    )

    jest.spyOn(podcastsService, 'getPodcasts').mockReturnValue(podcastsPromise)

    const setCachedPodcastsMock = jest.spyOn(
      podcastsService,
      'setCachedPodcasts'
    )

    const podcasts = await getPodcastsListWithService()
    const { author, id, img, name } = podcasts[0]

    expect(setCachedPodcastsMock).toHaveBeenCalledWith(mockedData)

    expect(podcasts.length).toBe(1)
    expect({ author, id, img, name }).toEqual({
      author: 'name',
      id: '123',
      img: '',
      name: 'name',
    })
  })
})
