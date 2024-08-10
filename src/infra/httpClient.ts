class HttpClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || ''
  }

  get<T>(url: string): Promise<T> {
    const apiUrl = this.baseUrl + url

    return fetch(apiUrl)
      .then(async (response) => {
        if (response.ok) return response.json()
        console.error('Network response was not ok.')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export { HttpClient }
