import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EpisodeCard from './EpisodeCard'

describe('EpisodeCard component', () => {
  test('render data', async () => {
    const { container } = render(
      <EpisodeCard
        title="card title"
        desc="description"
        audio="audio.mp3"
      ></EpisodeCard>
    )

    expect(screen.getByTestId('title')).toHaveTextContent('card title')
    expect(screen.getByTestId('desc')).toHaveTextContent('description')
    expect(container.querySelector('audio')).toHaveAttribute('src', 'audio.mp3')
  })
})
