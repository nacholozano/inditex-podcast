import { ReactNode, useState } from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import LoadingContext from 'ui/contexts/loading/loading'
import usePodcastsList from './usePodcastsList'
import Application from 'application'

const Wrapper = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

describe('usePodcastsList', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('init hook', async () => {
    const spyGetPodcastsList = jest
      .spyOn(Application, 'getPodcastsList')
      .mockReturnValue(Promise.resolve([]))

    const { result } = renderHook(usePodcastsList, {
      wrapper: Wrapper,
    })

    const podcastsList = result.current.podcastsList
    const firstItem = podcastsList[0]

    expect(podcastsList).toHaveLength(7)
    expect(firstItem.name).toBe('- - -')
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(spyGetPodcastsList).toHaveBeenCalledTimes(1))
  })

  test('get data', async () => {
    const spyGetPodcastsList = jest
      .spyOn(Application, 'getPodcastsList')
      .mockReturnValue(Promise.resolve([]))

    const { result } = renderHook(usePodcastsList, {
      wrapper: Wrapper,
    })

    await waitFor(() => expect(spyGetPodcastsList).toHaveBeenCalledTimes(1))

    const podcastsList = result.current.podcastsList

    expect(podcastsList).toHaveLength(0)
    expect(result.current.loading).toBe(false)
  })
})
