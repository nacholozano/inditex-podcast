export type RawPodcast = {
  trackId: number
  artworkUrl100: string
  artworkUrl600: string
  trackName: string
  description: string
  artistName: string
  wrapperType: 'track' | 'podcastEpisode'
  trackCount: number
  releaseDate: string
  trackTimeMillis: number
  episodeUrl: string
}

export type RawPodcastData = {
  results: RawPodcast[]
}
