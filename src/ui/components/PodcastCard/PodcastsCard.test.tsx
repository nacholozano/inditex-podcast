import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PodcastCard from './PodcastCard'

describe('PodcastsCard component', () => {
  test('Show title', async () => {
    render(
      <PodcastCard title="title-test" img="" alt="" author=""></PodcastCard>
    )
    expect(screen.getByTestId('title')).toHaveTextContent('title-test')
  })

  test('Show author', async () => {
    render(
      <PodcastCard title="" img="" alt="" author="author-test"></PodcastCard>
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
      ></PodcastCard>
    )
    expect(screen.getByAltText('title-test')).toHaveAttribute(
      'src',
      'image.png'
    )
  })
})
