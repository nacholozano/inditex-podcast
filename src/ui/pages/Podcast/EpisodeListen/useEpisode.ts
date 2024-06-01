import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Application from 'application'
import { Episode } from 'domain/Episode/Episode'

const useEpisode = () => {
  const { podcastId, episodeId } = useParams()
  const [episode, setEpisode] = useState(new Episode({}))

  useEffect(() => {
    const loadEpisode = async () => {
      const episode = await Application.getEpisode({ podcastId, episodeId })

      setEpisode(episode)
    }

    loadEpisode()
  }, [podcastId, episodeId])

  return { episode }
}

export default useEpisode
