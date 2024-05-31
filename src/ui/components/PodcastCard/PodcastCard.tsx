import { FC } from 'react'
import Card from 'ui/components/Card/Card'
import { Props } from './types'
import styles from './styles.module.css'

const PodcastCard: FC<Props> = ({ img, alt, title, author }) => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={img} className={styles.img} alt={alt} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>Author: {author}</div>
        </div>
      </div>
    </Card>
  )
}

export default PodcastCard
