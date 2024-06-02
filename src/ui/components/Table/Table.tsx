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
              <th
                className={styles.headCell}
                align={header.align}
                key={header.code}
              >
                {header.name}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr className={styles.row} key={item.id.value}>
              {headers.map((header) => {
                const tdClasses = `${styles.bodyCell} ${header.oneLine ? styles.oneLine : ''}`

                return (
                  <td
                    className={tdClasses}
                    align={header.align}
                    key={`${item.id}-${header.code}`}
                  >
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
