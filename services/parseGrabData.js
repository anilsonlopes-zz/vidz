import { random } from 'faker'
import slug from 'slug'

export const parse = (data) => {
  const parsed = {
    id: random.uuid(),
    published: new Date().getTime(),
    slug: slug(data.Title, { lower: true }),
    search: {}
  }
  Object.keys(data).map((key) => {
    const k = key.toLowerCase()
    switch (k) {
      case 'awards':
        const awardList = data[key].split(',')
        parsed.search.awards = {}
        awardList.forEach((award) => {
          parsed.search.awards[slug(award, { lower: true })] = true
        })
        break

      case 'director':
        const directorList = data[key].split(',')
        parsed.search.directors = {}
        directorList.forEach((director) => {
          parsed.search.directors[slug(director, { lower: true })] = true
        })
        break

      case 'genre':
        const genreList = data[key].split(',')
        parsed.search.genres = {}
        genreList.forEach((genre) => {
          parsed.search.genres[slug(genre, { lower: true })] = true
        })
        break

      case 'language':
        const languageList = data[key].split(',')
        parsed.search.languages = {}
        languageList.forEach((language) => {
          parsed.search.languages[slug(language, { lower: true })] = true
        })
        break

      case 'actors':
        const actorList = data[key].split(',')
        parsed.search.actors = {}
        actorList.forEach((actor) => {
          parsed.search.actors[slug(actor, { lower: true })] = true
        })
        break

      case 'released':
        parsed.search.released = new Date(data[key]).getTime()
        break

      case 'runtime':
        parsed.search.runtime = parseInt(data[key].split('min')[0].trim())
        break

      case 'writer':
        const writerList = data[key].split(',')
        parsed.search.writers = {}
        writerList.forEach((writer) => {
          parsed.search.writers[slug(writer, { lower: true })] = true
        })
        break

      case 'metascore':
        parsed.search.metascore = parseInt(data[key])
        break

      case 'year':
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
