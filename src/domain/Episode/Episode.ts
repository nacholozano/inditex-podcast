type Props = {
  id?: number
  title?: string
  date?: string
  duration?: number
  description?: string
  audio?: string
}

class Episode {
  private _id: number
  private _title: string
  private _date: string
  private _duration: number
  private _description: string
  private _audio: string

  constructor({ id, title, date, duration, description, audio }: Props) {
    this._id = id || null
    this._title = title || ''
    this._date = date || ''
    this._duration = duration || null
    this._description = description || ''
    this._audio = audio || ''
  }

  public get id(): number {
    return this._id
  }

  public get title(): string {
    return this._title
  }

  public get date(): string {
    return this._date
  }

  public get duration(): number {
    return this._duration
  }

  public get description(): string {
    return this._description
  }

  public get audio(): string {
    return this._audio
  }
}

export { Episode }
