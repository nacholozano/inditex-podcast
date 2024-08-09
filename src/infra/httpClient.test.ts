import { HttpClient } from './httpClient'

global.fetch = jest.fn()

describe('http client', () => {
  test('no init url', () => {
    const response: Response = {
      ok: true,
      json: () => Promise.resolve({ data: null }),
    } as Response

    jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response))

    const httpClient = new HttpClient()
    const spyFetch = jest.spyOn(global, 'fetch')

    httpClient.get('/podcasts')

    expect(spyFetch).toHaveBeenCalledWith('/podcasts')
  })

  test('init url', () => {
    const response: Response = {
      ok: true,
      json: () => Promise.resolve({ data: null }),
    } as Response

    jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response))

    const httpClient = new HttpClient('/api')
    const spyFetch = jest.spyOn(global, 'fetch')

    httpClient.get('/podcasts')

    expect(spyFetch).toHaveBeenCalledWith('/api/podcasts')
  })

  test('json', async () => {
    const response: Response = {
      ok: true,
      json: () => Promise.resolve({ data: null }),
    } as Response

    jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response))

    const httpClient = new HttpClient()
    const spyJson = jest.spyOn(response, 'json')

    await httpClient.get('/podcasts')

    expect(spyJson).toHaveBeenCalledTimes(1)
  })

  test('json', async () => {
    const response: Response = {
      ok: false,
      json: () => Promise.resolve({ data: null }),
    } as Response

    jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response))
    jest.spyOn(console, 'error').mockReturnValue(null)

    const httpClient = new HttpClient()
    const spyJson = jest.spyOn(response, 'json')

    await httpClient.get('/podcasts')

    expect(spyJson).not.toHaveBeenCalled()
  })

  test('error', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(Promise.reject('error'))
    const spyCOnsoleError = jest.spyOn(console, 'error').mockReturnValue(null)

    const httpClient = new HttpClient()

    await httpClient.get('/podcasts')

    expect(spyCOnsoleError).toHaveBeenCalledWith('error')
  })
})
