import { FC } from 'react'
import { Link } from 'react-router-dom'
import Card from 'ui/components/Card/Card'
import { Props } from './types'
import styles from './styles.module.css'

const Header: FC<Props> = ({ title, loading, path }) => {
  return (
    <Card>
      <header className={styles.container} data-testid="header-container">
        <div>
          <h1 className={styles.title} data-testid="title">
            <Link to={path}>{title}</Link>
          </h1>
        </div>
        {loading && (
          <div>
            <div
              className={styles.loadingIndicator}
              data-testid="loading"
            ></div>
          </div>
        )}
      </header>
    </Card>
  )
}

export default Header
