import { FC, useEffect, useState } from 'react'
import { Podcast } from 'domain/Podcast'
import PodcastCard from 'ui/components/PodcastCard/PodcastCard'
import usePodcastsList from './usePodcastsList'
import usePodcastsFilter from './usePodcastsFilter'
import styles from './styles.module.css'

const Home: FC = () => {
  const [data, setData] = useState<Podcast[]>([])
  const { podcastsList } = usePodcastsList()
  const { listedData, handleInputChange } = usePodcastsFilter({ data })

  useEffect(() => {
    setData(podcastsList)
  }, [podcastsList])

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <span className={styles.counter}>{listedData.length}</span>
          <input
            className={styles.input}
            placeholder="Filter podcasts..."
            onChange={handleInputChange}
          />
        </div>
        <ul className={styles.podcastList}>
          {listedData.map((item) => {
            return (
              <li key={item.id}>
                <PodcastCard
                  img={item.img}
                  alt={item.name}
                  title={item.name}
                  author={item.author}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}

export default Home
