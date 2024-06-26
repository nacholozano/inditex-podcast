import { Episode } from 'domain/Episode/Episode'
import { Podcast } from 'domain/Podcast/Podcast'
import { PodcastService } from 'infra/Podcast/Podcast.service'
import { RawPodcast } from 'infra/Podcast/types'

const getPodcast =
  (podcastService: PodcastService) =>
  async ({ id }: { id: string }): Promise<Podcast> => {
    const expiredData = podcastService.hasCachedPodcastsExpired({ id })

    let rawPodcast

    if (expiredData) {
      rawPodcast = await podcastService.getPodcast({ id })
      if (rawPodcast) {
        podcastService.setCachedPodcast({ id, data: rawPodcast })
      }
    } else {
      rawPodcast = podcastService.getCachedPodcast({ id })
    }

    const podcast: RawPodcast = rawPodcast.results.find(
      (item) => item.wrapperType === 'track'
    )
    const episodes: RawPodcast[] = rawPodcast.results.filter(
      (item) => item.wrapperType === 'podcastEpisode'
    )

    const {
      trackId,
      artworkUrl600,
      trackName,
      artistName,
      trackCount,
      description,
    } = podcast

    return new Podcast({
      id: String(trackId),
      img: artworkUrl600,
      name: trackName,
      author: artistName,
      desc: description,
      totalEpisode: trackCount,
      episodes: episodes.map(
        (episode) =>
          new Episode({
            id: String(episode.trackId),
            title: episode.trackName,
            date: episode.releaseDate,
            duration: episode.trackTimeMillis,
            description: episode.description,
            audio: episode.episodeUrl,
          })
      ),
    })
  }

export default getPodcast
