import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Props } from './types'
import styles from './styles.module.css'

const Table: FC<Props> = ({ headers, data }) => {
  return (
    <table>
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
                    {item.path ? (
                      <Link to={item.path}>{item[header.key]}</Link>
                    ) : (
                      item[header.key]
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
