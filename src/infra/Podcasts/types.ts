export enum PodcastListImgSize {
  small = '55',
  medium = '60',
  big = '170',
}

export type PodcastList = {
  id: {
    attributes: {
      'im:id': string
    }
  }
  'im:artist': {
    label: string
  }
  'im:image': {
    attributes: {
      height: PodcastListImgSize
    }
    label: string
  }[]
  'im:name': {
    label: string
  }
}

export type RawPodcastsListData = {
  feed: {
    entry: PodcastList[]
  }
}
