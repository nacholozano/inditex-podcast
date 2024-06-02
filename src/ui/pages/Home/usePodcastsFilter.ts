import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { Podcast } from 'domain/Podcast/Podcast'
import FilterContext from 'ui/contexts/filter/filter'

const filterData = (data: Podcast[], value: string) => {
  const newListedData = value
    ? data.filter((item) => {
        const includesInName = item.name.toLowerCase().includes(value)
        const includesInAuthor = item.author.toLowerCase().includes(value)

        return includesInName || includesInAuthor
      })
    : data

  return newListedData
}

const usePodcastsFilter = ({ data }: { data: Podcast[] }) => {
  const [listedData, setListedData] = useState<Podcast[]>([])
  const inputDebounce = useRef(null)
  const { filter, setFilter } = useContext(FilterContext)
  const [termValue, setTermValue] = useState(filter.term)

  useEffect(() => {
    if (termValue) {
      setListedData(filterData(data, termValue))
    } else {
      setListedData(data)
    }
  }, [data, termValue])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputDebounce.current) {
      clearTimeout(inputDebounce.current)
    }

    inputDebounce.current = setTimeout(() => {
      const value = event.target?.value

      setFilter({
        term: value,
      })
      setTermValue(value)
    }, 300)
  }

  return {
    termValue,
    listedData,
    handleInputChange,
  }
}

export default usePodcastsFilter
