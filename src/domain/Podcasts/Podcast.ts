type Props = {
  id: string
  name: string
  author: string
  img: string
}

class Podcast {
  private _id: string
  private _name: string
  private _author: string
  private _img: string

  constructor({ id, name, author, img }: Props) {
    this._id = id
    this._name = name || ''
    this._author = author || ''
    this._img = img || ''
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
}

export { Podcast }
