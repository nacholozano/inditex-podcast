import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Props } from './types'
import styles from './styles.module.css'

const Table: FC<Props> = ({ headers, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => {
            return (
              <th className={styles.headCell} align={header.align}>
                {header.name}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr className={styles.row}>
              {headers.map((header) => {
                return (
                  <td className={styles.bodyCell} align={header.align}>
                    {item[header.key].path ? (
                      <Link to={item[header.key].path} className={styles.link}>
                        {item[header.key].value}
                      </Link>
                    ) : (
                      item[header.key].value
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
