import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Test from './Test'

test('test', async () => {
  render(<Test />)
  expect(screen.getByRole('button')).toHaveTextContent('run')
})
