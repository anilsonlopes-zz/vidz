
import faker from 'faker'

class User {
  constructor(data = {}, options = {}) {
    this.data = {
      uid: data.uid || faker.random.uuid(),
      username: data.username || '',
      name: data.name || '',
      email: data.email || '',
      avatar: data.avatar || faker.image.avatar(),
      createdAt: data.createdAt || new Date(),
      role: data.role || 'default'
    }
  }
}

export default User
