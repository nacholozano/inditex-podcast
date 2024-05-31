import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Podcast } from 'domain/Podcast'

const usePodcastsFilter = ({ data }: { data: Podcast[] }) => {
  const [listedData, setListedData] = useState<Podcast[]>([])
  const inputDebounce = useRef(null)

  useEffect(() => {
    setListedData(data)
  }, [data])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputDebounce.current) {
      clearTimeout(inputDebounce.current)
    }

    inputDebounce.current = setTimeout(() => {
      const value = event.target?.value

      const newListedData = value
        ? data.filter((item) => {
            const includesInName = item.name.toLowerCase().includes(value)
            const includesInAuthor = item.author.toLowerCase().includes(value)

            return includesInName || includesInAuthor
          })
        : data

      setListedData(newListedData)
    }, 300)
  }

  return {
    listedData,
    handleInputChange,
  }
}

export default usePodcastsFilter
