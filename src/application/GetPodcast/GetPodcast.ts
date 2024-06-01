import { Episode } from 'domain/Episode/Episode'
import { Podcast } from 'domain/Podcast/Podcast'
import { PodcastService } from 'infra/Podcast/Podcast.service'
import { RawPodcast } from 'infra/Podcast/types'

const getPodcast =
  (podcastService: PodcastService) =>
  async ({ id }: { id: string }): Promise<Podcast> => {
    const rawPodcast = await podcastService.getPodcast({ id })

    console.log({ rawPodcast })

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
      id: trackId,
      img: artworkUrl600,
      name: trackName,
      author: artistName,
      desc: description,
      totalEpisode: trackCount,
      episodes: episodes.map(
        (episode) =>
          new Episode({
            id: episode.trackId,
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
