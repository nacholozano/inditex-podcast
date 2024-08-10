import Card from 'ui/components/Card/Card'
import Separator from 'ui/components/Separator/Separator'
import { Props } from './types'
import styles from './styles.module.css'

const EpisodeCard = ({ title, desc, audio }: Props) => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.title} data-testid="title">
          {title}
        </div>
        <p
          data-testid="desc"
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        ></p>
        <Separator />
        <div className={styles.audioContainer}>
          <audio src={audio} controls className={styles.audio}></audio>
        </div>
      </div>
    </Card>
  )
}

export default EpisodeCard
