import { Episode } from 'domain/Episode/Episode'

type Props = {
  id?: string
  name?: string
  author?: string
  img?: string
  desc?: string
  totalEpisode?: number
  episodes?: Episode[]
}

class Podcast {
  private _id: string
  private _name: string
  private _author: string
  private _img: string
  private _desc: string
  private _totalEpisode: number
  private _episodes: Episode[]

  constructor({ id, name, author, img, desc, totalEpisode, episodes }: Props) {
    this._id = id
    this._name = name || ''
    this._author = author || ''
    this._img = img || ''
    this._desc = desc || ''
    this._totalEpisode = totalEpisode || 0
    this._episodes = episodes || []
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get author(): string {
    return this._author
  }

  public get img(): string {
    return this._img
  }

  public get desc(): string {
    return this._desc
  }

  public get totalEpisode(): number {
    return this._totalEpisode
  }

  public get episodes(): Episode[] {
    return this._episodes
  }
}

export { Podcast }
