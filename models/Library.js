import { random } from 'faker'

class Library {
  constructor(data = {}) {
    this.data = {
      id: data.id || random.uuid(),
      postId: data.postId,
      userId: data.userId,
      slug: data.slug,
      added: new Date().getTime()
    }
  }
}

export default Library
