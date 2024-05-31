class HttpClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || ''
  }

  get<T>(url: string): Promise<T> {
    const apiUrl = this.baseUrl + url
    const wrappedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`

    return fetch(wrappedUrl)
      .then(async (response) => {
        if (response.ok) return response.json()
        console.error('Network response was not ok.')
      })
      .then((data) => {
        return JSON.parse(data.contents)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export { HttpClient }
