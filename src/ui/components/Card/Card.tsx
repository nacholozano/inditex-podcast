import { FC } from 'react'
import { Props } from './types'
import styles from './styles.module.css'

const Card: FC<Props> = ({ children }) => {
  return <section className={styles.container}>{children}</section>
}

export default Card
