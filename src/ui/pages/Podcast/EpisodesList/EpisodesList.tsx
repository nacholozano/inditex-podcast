import { FC } from 'react'
import Card from 'ui/components/Card/Card'
import Table from 'ui/components/Table/Table'
import styles from './styles.module.css'
import { Props } from './types'

const EpisodesList: FC<Props> = ({ count, episodes }) => {
  return (
    <div>
      <Card>
        <div className={styles.counter}>Episodes: {count}</div>
      </Card>
      <Card>
        <div className={styles.list}>
          <Table
            headers={[
              { code: 'title', key: 'name', name: 'Title' },
              { code: 'date', key: 'date', name: 'Date' },
              {
                code: 'duration',
                key: 'duration',
                name: 'Duration',
                align: 'right',
              },
            ]}
            data={episodes}
          />
        </div>
      </Card>
    </div>
  )
}

export default EpisodesList
