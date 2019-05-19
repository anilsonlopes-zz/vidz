import { random } from 'faker'
import slug from 'slug'

export const parse = (data) => {
  const parsed = {
    id: random.uuid(),
    published: new Date().getTime(),
    slug: slug(data.Title, { lower: true }),
    search: {},
    stats: {
      'watch-later': 0,
      'watched': 0,
      'liked': 0,
      'views': 1
    }
  }
  Object.keys(data).map((key) => {
    const k = key.toLowerCase()
    switch (k) {
      case 'awards':
        const awardList = data[key].split(',')
        parsed.awards = data[key]
        parsed.search.awards = {}
        awardList.forEach((award) => {
          parsed.search.awards[slug(award, { lower: true })] = true
        })
        break

      case 'director':
        const directorList = data[key].split(',')
        parsed.director = data[key]
        parsed.search.directors = {}
        directorList.forEach((director) => {
          parsed.search.directors[slug(director, { lower: true })] = true
        })
        break

      case 'genre':
        const genreList = data[key].split(',')
        parsed.genres = data[key]
        parsed.search.genres = {}
        genreList.forEach((genre) => {
          parsed.search.genres[slug(genre, { lower: true })] = true
        })
        break

      case 'language':
        const languageList = data[key].split(',')
        parsed.language = data[key]
        parsed.search.languages = {}
        languageList.forEach((language) => {
          parsed.search.languages[slug(language, { lower: true })] = true
        })
        break

      case 'actors':
        const actorList = data[key].split(',')
        parsed.actors = data[key]
        parsed.search.actors = {}
        actorList.forEach((actor) => {
          parsed.search.actors[slug(actor, { lower: true })] = true
        })
        break

      case 'released':
        parsed.search.released = new Date(data[key]).getTime()
        parsed.released = data[key]
        break

      case 'runtime':
        parsed.search.runtime = parseInt(data[key].split('min')[0].trim())
        parsed.runtime = data[key]
        break

      case 'writer':
        const writerList = data[key].split(',')
        parsed.writer = data[key]
        parsed.search.writers = {}
        writerList.forEach((writer) => {
          parsed.search.writers[slug(writer, { lower: true })] = true
        })
        break

      case 'country':
        const countryList = data[key].split(',')
        parsed.country = data[key]
        parsed.search.countries = {}
        countryList.forEach((country) => {
          parsed.search.countries[slug(country, { lower: true })] = true
        })
        break

      case 'metascore':
        parsed.metascore = data[key]
        parsed.search.metascore = parseInt(data[key])
        break

      case 'year':
        parsed.year = data[key]
        parsed.search.year = parseInt(data[key])
        break

      default:
        parsed[k] = data[key]
        break
    }
  })
  delete parsed.response
  return parsed
}

export default parse
