import { podcastsService } from 'infra/Podcasts/Podcasts.service'
import getPodcastsList from './GetPodcastsList'

const Application = {
  getPodcastsList: getPodcastsList(podcastsService),
}

export default Application
