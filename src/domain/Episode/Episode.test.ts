import { Episode } from './Episode'

describe('Podcast Class', () => {
  let episode: Episode

  beforeEach(() => {
    episode = new Episode({
      id: '1',
      title: 'Red car',
      description: 'A red car',
      audio: '',
      date: '2020-04-01',
      duration: 123,
    })
  })

  test('id getter', () => {
    expect(episode.id).toBe('1')
  })

  test('title getter', () => {
    expect(episode.title).toBe('Red car')
  })

  test('description getter', () => {
    expect(episode.description).toBe('A red car')
  })

  test('audio getter', () => {
    expect(episode.audio).toBe('')
  })

  test('date getter', () => {
    expect(episode.date).toBe('2020-04-01')
  })

  test('duration getter', () => {
    expect(episode.duration).toBe(123)
  })

  test('no constructor data', () => {
    const { id, title, description, audio, date, duration } = new Episode({})

    expect({
      id,
      title,
      description,
      audio,
      date,
      duration,
    }).toEqual({
      id: null,
      title: '',
      description: '',
      audio: '',
      date: '',
      duration: null,
    })
  })
})
