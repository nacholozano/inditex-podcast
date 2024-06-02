import { useContext, useEffect, useState } from 'react'
import Application from 'application'
import { Podcast } from 'domain/Podcast/Podcast'
import LoadingContext from 'ui/contexts/loading/loading'
import PodcastPlaceholderImg from 'ui/assets/speaker.svg'

const usePodcastsList = () => {
  // Init with placeholder data
  const [data, setData] = useState<Podcast[]>(
    Array(7)
      .fill(null)
      .map(
        (_, index) =>
          new Podcast({
            id: String(index),
            name: '- - -',
            author: ' ... ',
            img: PodcastPlaceholderImg,
          })
      )
  )
  const { loading, setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)

    const getPodcastsList = async () => {
      const podcastsList = await Application.getPodcastsList()
      setData(podcastsList)
      setLoading(false)
    }

    getPodcastsList()
  }, [setLoading])

  return { loading, podcastsList: data }
}

export default usePodcastsList
