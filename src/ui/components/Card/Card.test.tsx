import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from './Card'

describe('Card component', () => {
  test('Show content', async () => {
    render(<Card>content</Card>)
    expect(screen.getByTestId('container')).toHaveTextContent('content')
  })
})
