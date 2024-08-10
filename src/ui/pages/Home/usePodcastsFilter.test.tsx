import { ChangeEvent, ReactNode, useState } from 'react'
import { act, renderHook } from '@testing-library/react'
import FilterContext from 'ui/contexts/filter/filter'
import usePodcastsFilter from './usePodcastsFilter'
import { Podcast } from 'domain/Podcast/Podcast'

const Wrapper = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState({ term: '' })

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

describe('usePodcastsFilter', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    jest.spyOn(global, 'clearTimeout')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('init hook', () => {
    const { result } = renderHook(usePodcastsFilter, {
      wrapper: Wrapper,
      initialProps: {
        data: [],
      },
    })

    expect(result.current.listedData).toEqual([])
    expect(result.current.termValue).toEqual('')
  })

  test('search podcast', () => {
    const { result } = renderHook(usePodcastsFilter, {
      wrapper: Wrapper,
      initialProps: {
        data: [
          new Podcast({
            name: 'Science',
            author: 'Alfred',
          }),
          new Podcast({
            name: 'Sports',
            author: 'John',
          }),
          new Podcast({
            name: 'Ocean',
            author: 'Mary',
          }),
        ],
      },
    })

    act(() =>
      result.current.handleInputChange({
        target: {
          value: 'science',
        },
      } as ChangeEvent<HTMLInputElement>)
    )

    act(() => {
      jest.runAllTimers()
    })

    const listedData = result.current.listedData
    const { name, author } = listedData[0]

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(listedData).toHaveLength(1)
    expect({
      name,
      author,
    }).toEqual({
      name: 'Science',
      author: 'Alfred',
    })
    expect(result.current.termValue).toEqual('science')
  })

  test('debounce input change', () => {
    const { result } = renderHook(usePodcastsFilter, {
      wrapper: Wrapper,
      initialProps: {
        data: [
          new Podcast({
            name: 'Science',
            author: 'Alfred',
          }),
          new Podcast({
            name: 'Sports',
            author: 'John',
          }),
          new Podcast({
            name: 'Ocean',
            author: 'Mary',
          }),
        ],
      },
    })

    act(() =>
      result.current.handleInputChange({
        target: {
          value: 'sc',
        },
      } as ChangeEvent<HTMLInputElement>)
    )

    act(() =>
      result.current.handleInputChange({
        target: {
          value: 'scien',
        },
      } as ChangeEvent<HTMLInputElement>)
    )

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(clearTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledTimes(2)
    expect(result.current.listedData).toHaveLength(1)
    expect(result.current.termValue).toEqual('scien')
  })
})
