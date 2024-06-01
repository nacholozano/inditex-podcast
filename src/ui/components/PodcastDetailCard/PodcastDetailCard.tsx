import Separator from 'ui/components/Separator/Separator'
import Card from 'ui/components/Card/Card'
import { Props } from './types'
import styles from './styles.module.css'

const PodcastDetailCard = ({ img, alt, title, author, description }: Props) => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={img} alt={alt} className={styles.img} />
        </div>
        <Separator />
        <div className={styles.infoContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>by {author}</div>
        </div>
        <Separator />
        <div className={styles.descContainer}>
          <span className={styles.descTitle}>Description:</span>
          <p className={styles.desc}>{description}</p>
        </div>
      </div>
    </Card>
  )
}

export default PodcastDetailCard
