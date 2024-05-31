import { useContext, useEffect, useState } from 'react'
import Application from 'application'
import { Podcast } from 'domain/Podcast'
import LoadingContext from 'ui/contexts/loading/loading'

const usePodcastsList = () => {
  const [data, setData] = useState<Podcast[]>([])
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)

    const getPodcastsList = async () => {
      const podcastsList = await Application.getPodcastsList()
      setData(podcastsList)
      setLoading(false)
    }

    getPodcastsList()
  }, [setLoading])

  return { podcastsList: data }
}

export default usePodcastsList
