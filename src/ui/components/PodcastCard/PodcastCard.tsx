import { FC } from 'react'
import { Link } from 'react-router-dom'
import Card from 'ui/components/Card/Card'
import { Props } from './types'
import styles from './styles.module.css'

const PodcastCard: FC<Props> = ({ img, alt, title, author, path }) => {
  return (
    <Link to={path}>
      <Card>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src={img} className={styles.img} alt={alt} />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.title} data-testid="title">
              {title}
            </div>
            <div className={styles.author} data-testid="author">
              Author: {author}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default PodcastCard
