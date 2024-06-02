import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import PodcastDetailCard from 'ui/components/PodcastDetailCard/PodcastDetailCard'
import EpisodesList from './EpisodesList/EpisodesList'
import usePodcast from './usePodcast'
import useEpisodes from './useEpisodes'
import styles from './styles.module.css'
import EpisodeListen from './EpisodeListen/EpisodeListen'

const Podcast: FC = () => {
  const { podcast } = usePodcast()
  const { episodes } = useEpisodes({ podcast })

  return (
    <div className={styles.container}>
      <div className={styles.podcastCard}>
        <PodcastDetailCard
          title={podcast.name}
          author={podcast.author}
          description={''}
          img={podcast.img}
          alt={podcast.name}
        />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="episode/:episodeId" element={<EpisodeListen />} />
          <Route
            path="/"
            element={
              <EpisodesList count={podcast.totalEpisode} episodes={episodes} />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default Podcast
