import { random } from 'faker'
import slug from 'slug'

export const parse = (data) => {
  const parsed = {
    id: random.uuid(),
    published: new Date().getTime(),
    slug: slug(data.Title, { lower: true })
  }
  Object.keys(data).map((key) => {
    parsed[key.toLowerCase()] = data[key]
  })
  return parsed
}

export default parse
