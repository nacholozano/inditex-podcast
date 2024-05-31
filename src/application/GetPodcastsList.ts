import { Podcast } from 'domain/Podcast'
import { PodcastListImgSize } from 'infra/Podcasts/types'
import { PodcastsService } from 'infra/Podcasts/Podcasts.service'

const getPodcastsList =
  (podcastsService: PodcastsService) => async (): Promise<Podcast[]> => {
    const expiredData = podcastsService.hasCachedPodcastsExpired()

    let rawData

    if (expiredData) {
      rawData = await podcastsService.getPodcasts()
      podcastsService.setCachedPodcasts(rawData)
    } else {
      rawData = podcastsService.getCachedPodcasts()
    }

    const podcasts = rawData.feed.entry

    const podcastList = podcasts.map((podcast) => {
      const mediumImage = podcast['im:image'].find(
        (img) => img.attributes.height === PodcastListImgSize.big
      ) || { label: '' }

      return new Podcast({
        id: podcast.id.attributes['im:id'],
        name: podcast['im:name'].label,
        author: podcast['im:artist'].label,
        img: mediumImage.label,
      })
    })

    return podcastList
  }

export default getPodcastsList
