import { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PodcastCard from './PodcastCard'

jest.mock('react-router-dom', () => ({
  Link: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

describe('PodcastsCard component', () => {
  test('Show title', async () => {
    render(
      <PodcastCard
        title="title-test"
        img=""
        alt=""
        author=""
        path=""
      ></PodcastCard>
    )
    expect(screen.getByTestId('title')).toHaveTextContent('title-test')
  })

  test('Show author', async () => {
    render(
      <PodcastCard
        title=""
        img=""
        alt=""
        author="author-test"
        path=""
      ></PodcastCard>
    )
    expect(screen.getByTestId('author')).toHaveTextContent(
      'Author: author-test'
    )
  })

  test('Show img', async () => {
    render(
      <PodcastCard
        title=""
        img="image.png"
        alt="title-test"
        author=""
        path=""
      ></PodcastCard>
    )
    expect(screen.getByAltText('title-test')).toHaveAttribute(
      'src',
      'image.png'
    )
  })
})
