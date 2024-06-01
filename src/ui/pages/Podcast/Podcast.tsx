import { FC, useContext, useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Application from 'application'
import { Podcast as PodcastClass } from 'domain/Podcast/Podcast'
import PodcastDetailCard from 'ui/components/PodcastDetailCard/PodcastDetailCard'
import LoadingContext from 'ui/contexts/loading/loading'
import EpisodesList from './EpisodesList/EpisodesList'
import styles from './styles.module.css'

const Podcast: FC = () => {
  const { setLoading } = useContext(LoadingContext)
  const { podcastId } = useParams()
  const [podcast, setPodcast] = useState<PodcastClass>(new PodcastClass({}))
  const [episodes, setEpisodes] = useState([])

  console.log({ podcastId })

  useEffect(() => {
    setLoading(true)

    const getPodcast = async () => {
      const podcast = await Application.getPodcast({ id: podcastId })

      console.log({ podcast })

      const parsedEpisodes = podcast.episodes.map((episode) => {
        return {
          name: episode.title,
          date: episode.date,
          duration: episode.duration,
          /* path: episode.id */
        }
      })

      setPodcast(podcast)
      setEpisodes(parsedEpisodes)
      setLoading(false)
    }

    getPodcast()
  }, [podcastId, setLoading])

  return (
    <div className={styles.wrapper}>
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
            <Route
              path="/"
              element={
                <EpisodesList
                  count={podcast.totalEpisode}
                  episodes={episodes}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Podcast
