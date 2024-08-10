import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Table from './Table'

jest.mock('react-router-dom', () => ({
  Link: ({ children }: { children: ReactNode }) => children,
}))

describe('Table component', () => {
  test('Show content', async () => {
    const { container } = render(
      <Table
        headers={[
          {
            name: 'Col 1',
            code: 'col-1',
            key: 'col1',
          },
          {
            name: 'Col 2',
            code: 'col-2',
            key: 'col2',
          },
          {
            name: 'Col 3',
            code: 'col-3',
            key: 'col3',
            oneLine: true,
          },
        ]}
        data={[
          {
            id: { value: '1' },
            col1: { value: 'value 1', path: '/value1' },
            col2: { value: 'value 2', path: '' },
            col3: { value: 'value 3', path: '' },
          },
          {
            id: { value: '2' },
            col1: { value: 'value 4', path: '/value2' },
            col2: { value: 'value 5', path: '' },
            col3: { value: 'value 6', path: '' },
          },
        ]}
      />
    )

    const thead = container.querySelector('thead')
    const th = thead.querySelectorAll('th')

    const tbody = container.querySelector('tbody')
    const rows = tbody.querySelectorAll('tr')

    expect(th.item(0)).toHaveTextContent('Col 1')
    expect(th.item(1)).toHaveTextContent('Col 2')
    expect(th.item(2)).toHaveTextContent('Col 3')

    const cellsRow1 = rows.item(0).querySelectorAll('td')

    expect(cellsRow1.item(0)).toHaveTextContent('value 1')
    expect(cellsRow1.item(1)).toHaveTextContent('value 2')
    expect(cellsRow1.item(2)).toHaveTextContent('value 3')

    const cellsRow2 = rows.item(1).querySelectorAll('td')

    expect(cellsRow2.item(0)).toHaveTextContent('value 4')
    expect(cellsRow2.item(1)).toHaveTextContent('value 5')
    expect(cellsRow2.item(2)).toHaveTextContent('value 6')
  })
})
