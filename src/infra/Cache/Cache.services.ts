class CacheService {
  private key: string

  constructor(key: string) {
    this.key = key
  }

  read() {
    const data = localStorage.getItem(this.key)
    return data ? JSON.parse(data) : null
  }

  save(data: unknown) {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(this.key, serializedData)
  }

  getTomorrowTimestamp(): number {
    const now = new Date()
    now.setDate(now.getDate() + 1)

    return now.getTime()
  }

  hasCacheExpired(expires: number) {
    return !expires || expires < new Date().getTime()
  }
}

export { CacheService }
