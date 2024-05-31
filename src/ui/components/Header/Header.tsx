import { FC } from 'react'
import { Props } from './types'
import styles from './styles.module.css'

const Header: FC<Props> = ({ title, loading }) => {
  return (
    <header className={styles.container}>
      <div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {loading && (
        <div>
          <div className={styles.loadingIndicator}></div>
        </div>
      )}
    </header>
  )
}

export default Header
