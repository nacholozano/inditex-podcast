import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'

describe('Header component', () => {
  test('Show title', async () => {
    render(<Header title="title-test"></Header>)
    expect(screen.getByTestId('title')).toHaveTextContent('title-test')
  })

  test('Show loading', async () => {
    render(<Header title="" loading></Header>)
    expect(screen.getByTestId('loading')).toBeTruthy()
  })
})
