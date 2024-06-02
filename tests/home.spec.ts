import { test, expect } from '@playwright/test'
import { podcasts } from './podcasts'

const url = 'http://localhost:5173/'

const mockPodcastsRequest = async (page) => {
  const apiUrl =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

  await page.route(
    `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`,
    async (route) => {
      const feed = {
        entry: podcasts,
      }

      await route.fulfill({ json: { contents: JSON.stringify({ feed }) } })
    }
  )
}

test('check number of podcasts', async ({ page }) => {
  await mockPodcastsRequest(page)
  await page.goto(url)

  await expect(page.getByLabel('podcast count')).toContainText('8')
  await expect(page.getByTestId('podcasts-card-container')).toHaveCount(8)
})

test('check podcasts info', async ({ page }) => {
  await mockPodcastsRequest(page)
  await page.goto(url)

  const podcasts = page.getByTestId('podcasts-card-container')
  const podcast0 = podcasts.nth(0)
  const podcast2 = podcasts.nth(2)
  const podcast5 = podcasts.nth(5)

  // podcast 0
  await expect(podcast0.getByTestId('title')).toContainText(
    'The Joe Budden Podcast'
  )
  await expect(podcast0.getByTestId('author')).toContainText(
    'The Joe Budden Network'
  )

  // podcast 2
  await expect(podcast2.getByTestId('title')).toContainText('THE MORNING SHIFT')
  await expect(podcast2.getByTestId('author')).toContainText('YOUKNOW MEDIA')

  // podcast 5
  await expect(podcast5.getByTestId('title')).toContainText(
    'Friday Night Karaoke'
  )
  await expect(podcast5.getByTestId('author')).toContainText(
    'Friday Night Karaoke'
  )
})

test('filter podcasts', async ({ page }) => {
  await mockPodcastsRequest(page)
  await page.goto(url)

  page.getByLabel('podcast filter').fill('the')

  await expect(page.getByLabel('podcast count')).toContainText('3')
  await expect(page.getByTestId('podcasts-card-container')).toHaveCount(3)

  page.getByLabel('podcast filter').fill('')

  await expect(page.getByLabel('podcast count')).toContainText('8')
  await expect(page.getByTestId('podcasts-card-container')).toHaveCount(8)

  page.getByLabel('podcast filter').fill('drink')

  await expect(page.getByLabel('podcast count')).toContainText('1')
  await expect(page.getByTestId('podcasts-card-container')).toHaveCount(1)
})

test('restore filter', async ({ page }) => {
  await mockPodcastsRequest(page)
  await page.goto(url)

  page.getByLabel('podcast filter').fill('the')
  const podcastCards = page.getByTestId('podcasts-card-container')

  await expect(page.getByLabel('podcast count')).toContainText('3')
  await expect(podcastCards).toHaveCount(3)

  await podcastCards.nth(0).click()
  await page.getByTestId('header-container').getByTestId('title').click()

  await expect(page.getByLabel('podcast filter')).toHaveValue('the')
  await expect(page.getByLabel('podcast count')).toContainText('3')
  await expect(podcastCards).toHaveCount(3)
})
