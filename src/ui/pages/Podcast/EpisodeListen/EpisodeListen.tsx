import { FC } from 'react'
import EpisodeCard from 'ui/components/EpisodeCard/EpisodeCard'
import useEpisode from './useEpisode'

const EpisodeListen: FC = () => {
  const { episode } = useEpisode()

  return (
    <EpisodeCard
      title={episode.title}
      desc={episode.description}
      audio={episode.audio}
    />
  )
}

export default EpisodeListen
