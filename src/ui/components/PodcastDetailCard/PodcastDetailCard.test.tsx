import { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PodcastDetailCard from './PodcastDetailCard'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ podcastID: '1' }),
  Link: ({ children }: { children: ReactNode }) => children,
}))

describe('PodcastDetailCard component', () => {
  test('Show content', async () => {
    const { container } = render(
      <PodcastDetailCard
        title="Get hired"
        author="me"
        img="img.png"
        alt="my portrait"
      />
    )

    expect(screen.getByTestId('title')).toHaveTextContent('Get hired')
    expect(screen.getByTestId('author')).toHaveTextContent('by me')
    expect(container.querySelector('img')).toHaveAttribute('src', 'img.png')
  })
})
