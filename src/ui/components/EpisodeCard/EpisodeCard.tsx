import Card from 'ui/components/Card/Card'
import Separator from 'ui/components/Separator/Separator'
import { Props } from './types'
import styles from './styles.module.css'

const EpisodeCard = ({ title, desc, /* sponsors, */ audio }: Props) => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        ></p>
        {/* <div className={styles.sponsors}>
          This episode is sponsored by{' '}
          {sponsors.map((item, index) => {
            let separator = ''

            if (sponsors[index - 1]) {
              if (index === sponsors.length - 1) {
                separator = ' and '
              } else {
                separator = ', '
              }
            }

            return (
              <span key={item.text}>
                {separator}
                <a>{item.text}</a>
              </span>
            )
          })}
        </div> */}
        <Separator />
        <div className={styles.audioContainer}>
          <audio src={audio} controls className={styles.audio}></audio>
        </div>
      </div>
    </Card>
  )
}

export default EpisodeCard
