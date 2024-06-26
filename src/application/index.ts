import { podcastsService } from 'infra/Podcasts/Podcasts.service'
import { podcastService } from 'infra/Podcast/Podcast.service'
import getPodcastsList from './GetPodcastsList/GetPodcastsList'
import getPodcast from './GetPodcast/GetPodcast'
import getEpisode from './GetEpisode/GetEpisode'

const Application = {
  getPodcastsList: getPodcastsList(podcastsService),
  getPodcast: getPodcast(podcastService),
  getEpisode: getEpisode(podcastService),
}

export default Application
