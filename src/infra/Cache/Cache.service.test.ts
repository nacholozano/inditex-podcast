import { CacheService } from './Cache.services'

describe('Cache service', () => {
  let cacheService: CacheService

  beforeEach(() => {
    cacheService = new CacheService('key-localStorage')
  })

  test('no data to read', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(undefined)

    expect(cacheService.read()).toBeNull()
  })

  test('read data', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('{"a": 1}')

    expect(cacheService.read()).toEqual({
      a: 1,
    })
  })

  test('save data', () => {
    const spySetItem = jest.spyOn(Storage.prototype, 'setItem')

    cacheService.save({ b: 2 })

    expect(spySetItem).toHaveBeenCalledWith('key-localStorage', '{"b":2}')
  })

  test('expired cache', () => {
    const savedDate = new Date(2019, 1, 1)
    const now = new Date(2020, 1, 1)

    jest.spyOn(global, 'Date').mockReturnValue(now)

    expect(cacheService.hasCacheExpired(savedDate.getTime())).toBe(true)
  })

  test('no expired cache', () => {
    const savedDate = new Date(2020, 1, 2)
    const now = new Date(2020, 1, 1)

    jest.spyOn(global, 'Date').mockReturnValue(now)

    expect(cacheService.hasCacheExpired(savedDate.getTime())).toBe(false)
  })
})
