import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Application from 'application'
import LoadingContext from 'ui/contexts/loading/loading'
import { Podcast as PodcastClass } from 'domain/Podcast/Podcast'
import PodcastPlaceholderImg from 'ui/assets/speaker.svg'

const usePodcast = () => {
  const { setLoading } = useContext(LoadingContext)
  const { podcastId } = useParams()

  // Placeholder podcast
  const [podcast, setPodcast] = useState<PodcastClass>(
    new PodcastClass({
      img: PodcastPlaceholderImg,
      name: '- - -',
      author: '...',
      episodes: [],
    })
  )

  useEffect(() => {
    setLoading(true)

    const getPodcast = async () => {
      const podcast = await Application.getPodcast({ id: podcastId })

      setPodcast(podcast)
      setLoading(false)
    }

    getPodcast()
  }, [podcastId, setLoading])

  return {
    podcast,
  }
}

export default usePodcast
