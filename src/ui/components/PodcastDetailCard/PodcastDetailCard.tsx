import { Link, useParams } from 'react-router-dom'
import Separator from 'ui/components/Separator/Separator'
import Card from 'ui/components/Card/Card'
import { Props } from './types'
import styles from './styles.module.css'

const PodcastDetailCard = ({ img, alt, title, author }: Props) => {
  const { podcastId } = useParams()
  const pathTopodcast = `/podcast/${podcastId}`

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Link to={pathTopodcast}>
            <img src={img} alt={alt} className={styles.img} />
          </Link>
        </div>
        <Separator />
        <div className={styles.infoContainer}>
          <div className={styles.title}>
            <Link to={pathTopodcast} className={styles.link}>
              {title}
            </Link>
          </div>
          <div className={styles.author}>
            by{' '}
            <Link to={pathTopodcast} className={styles.link}>
              {author}
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PodcastDetailCard
