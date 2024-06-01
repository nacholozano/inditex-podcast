import { Episode } from 'domain/Episode/Episode'
import { PodcastService } from 'infra/Podcast/Podcast.service'
import { RawPodcast } from 'infra/Podcast/types'

const getEpisode =
  (podcastService: PodcastService) =>
  async ({
    podcastId,
    episodeId,
  }: {
    podcastId: string
    episodeId: string
  }): Promise<Episode> => {
    const rawPodcast = podcastService.getCachedPodcast({ id: podcastId })

    const episode: RawPodcast = rawPodcast.results.find((item) => {
      return (
        item.wrapperType === 'podcastEpisode' &&
        String(item.trackId) === episodeId
      )
    })

    const { trackId, trackName, episodeUrl, description } = episode

    return new Episode({
      id: trackId,
      title: trackName,
      audio: episodeUrl,
      description: description,
    })
  }

export default getEpisode
