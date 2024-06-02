import { useEffect, useState } from 'react'
import { Podcast } from 'domain/Podcast/Podcast'

const useEpisodes = ({ podcast }: { podcast: Podcast }) => {
  // Placeholder episodes list
  const [episodes, setEpisodes] = useState(
    Array(9)
      .fill(null)
      .map((_, index) => ({
        name: { value: '- - -', path: '' },
        date: { value: '--/--/----' },
        duration: { value: '--:--' },
        id: { value: String(index) },
      }))
  )

  useEffect(() => {
    if (!podcast.episodes?.length) {
      return
    }

    const referenceDate = new Date(0)

    const parsedEpisodes = podcast.episodes.map((episode) => {
      const durationTime = new Date(episode.duration)
      const datesDiff = durationTime.getTime() - referenceDate.getTime()

      // Get duration in minutes
      // 1 second: 1000 milliseconds
      // 1 minute: 60 seconds
      // milliseconds -> seconds -> minutes
      const millisecondsToSeconds = datesDiff / 1000
      const durationInMInutes = millisecondsToSeconds / 60

      const [minutes, secondsRaw] = durationInMInutes.toFixed(2).split('.')

      const secondsInDecimal = Number(secondsRaw) / 100
      const seconds = String(Math.round(60 * secondsInDecimal))
      const fullSeconds = seconds.length === 2 ? seconds : `0${seconds}`

      return {
        name: { value: episode.title, path: `episode/${episode.id}` },
        date: { value: new Date(episode.date).toLocaleDateString() },
        duration: { value: `${minutes}:${fullSeconds}` },
        id: { value: episode.id },
      }
    })

    setEpisodes(parsedEpisodes)
  }, [podcast])

  return {
    episodes,
  }
}

export default useEpisodes
