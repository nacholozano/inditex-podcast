import { Podcast } from './Podcast'

describe('Podcast Class', () => {
  let podcast: Podcast

  beforeEach(() => {
    podcast = new Podcast({
      id: '123',
      name: 'Science',
      author: 'Smart Person',
      img: 'image.png',
    })
  })

  test('id getter', () => {
    expect(podcast.id).toBe('123')
  })

  test('name getter', () => {
    expect(podcast.name).toBe('Science')
  })

  test('author getter', () => {
    expect(podcast.author).toBe('Smart Person')
  })

  test('img getter', () => {
    expect(podcast.img).toBe('image.png')
  })

  test('no constructor data', () => {
    const { id, name, author, img, desc, totalEpisode, episodes } = new Podcast(
      {}
    )

    expect({
      id,
      name,
      author,
      desc,
      img,
      totalEpisode,
      episodes,
    }).toEqual({
      id: null,
      name: '',
      author: '',
      desc: '',
      img: '',
      totalEpisode: 0,
      episodes: [],
    })
  })
})
