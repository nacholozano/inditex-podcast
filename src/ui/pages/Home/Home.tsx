import { FC } from 'react'
import PodcastCard from 'ui/components/PodcastCard/PodcastCard'
import usePodcastsList from './usePodcastsList'
import usePodcastsFilter from './usePodcastsFilter'
import styles from './styles.module.css'

const Home: FC = () => {
  const { loading, podcastsList } = usePodcastsList()
  const { termValue, listedData, handleInputChange } = usePodcastsFilter({
    data: podcastsList,
  })

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <span className={styles.counter} aria-label="podcast count">
          {loading ? 0 : listedData.length}
        </span>
        <input
          aria-label="podcast filter"
          className={styles.input}
          placeholder="Filter podcasts..."
          onChange={handleInputChange}
          defaultValue={termValue}
          disabled={loading}
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
                path={loading ? '' : `podcast/${item.id}`}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
